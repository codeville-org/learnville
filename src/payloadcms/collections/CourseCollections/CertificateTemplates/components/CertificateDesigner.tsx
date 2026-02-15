'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'
import * as fabric from 'fabric'

// ── Constants ──

const PLACEHOLDERS = [
  { label: 'Student Name', value: '{{studentName}}' },
  { label: 'Course Name', value: '{{courseName}}' },
  { label: 'Instructor Name', value: '{{instructorName}}' },
  { label: 'Certificate Number', value: '{{certificateNumber}}' },
  { label: 'Completion Date', value: '{{completionDate}}' },
  { label: 'Total XP', value: '{{totalXP}}' },
  { label: 'Issued Date', value: '{{issuedAt}}' },
]

const ZOOM_MIN = 0.25
const ZOOM_MAX = 3
const ZOOM_STEP = 0.1
const HISTORY_MAX = 30

// ── Shared inline-style fragments ──

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
  padding: '0.5rem 0.75rem',
  backgroundColor: 'var(--theme-elevation-50)',
  border: '1px solid var(--theme-elevation-150)',
  borderTop: 'none',
  alignItems: 'center',
  fontSize: '13px',
}

const inputSmall: React.CSSProperties = { width: 55, padding: '2px 4px' }
const selectSmall: React.CSSProperties = { padding: '2px 4px' }

// ── Types ──

interface CanvasState {
  objects: unknown[]
  version: string
}

// ── Main Component ──

export const CertificateDesigner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [activeObjType, setActiveObjType] = useState<string | null>(null)
  const ignoreNextCanvasChange = useRef(false)

  // Zoom & pan state
  const [zoom, setZoom] = useState(1)
  const [isPanning, setIsPanning] = useState(false)
  const isPanningRef = useRef(false)
  const panStartRef = useRef<{ x: number; y: number } | null>(null)

  // Undo / redo
  const historyRef = useRef<string[]>([])
  const historyIndexRef = useRef(-1)
  const isHistoryAction = useRef(false)

  // Selection counter to force ActiveObjectProperties re-render
  const [selectionTick, setSelectionTick] = useState(0)

  // Payload field bindings
  const { value: canvasData, setValue: setCanvasData } = useField<CanvasState | null>({
    path: 'canvasData',
  })
  const canvasWidth = useFormFields(([fields]) => fields['canvasWidth']?.value as number) || 1122
  const canvasHeight = useFormFields(([fields]) => fields['canvasHeight']?.value as number) || 793

  // ── History helpers ──

  const pushHistory = useCallback(() => {
    if (!fabricRef.current || isHistoryAction.current) return
    const json = JSON.stringify(fabricRef.current.toJSON())
    // Trim any future states after current index
    historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1)
    historyRef.current.push(json)
    if (historyRef.current.length > HISTORY_MAX) {
      historyRef.current.shift()
    }
    historyIndexRef.current = historyRef.current.length - 1
  }, [])

  const applyHistory = useCallback(
    async (index: number) => {
      if (!fabricRef.current) return
      const json = historyRef.current[index]
      if (!json) return
      isHistoryAction.current = true
      ignoreNextCanvasChange.current = true
      historyIndexRef.current = index
      await fabricRef.current.loadFromJSON(JSON.parse(json))
      fabricRef.current.renderAll()
      ignoreNextCanvasChange.current = false
      isHistoryAction.current = false
      // Sync to Payload field
      setCanvasData(fabricRef.current.toJSON())
    },
    [setCanvasData],
  )

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) applyHistory(historyIndexRef.current - 1)
  }, [applyHistory])

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1)
      applyHistory(historyIndexRef.current + 1)
  }, [applyHistory])

  // ── Save canvas → field + push history ──

  const saveToField = useCallback(() => {
    if (!fabricRef.current || ignoreNextCanvasChange.current) return
    const json = fabricRef.current.toJSON()
    setCanvasData(json)
    pushHistory()
  }, [setCanvasData, pushHistory])

  // ── Zoom helpers ──

  const applyZoom = useCallback((newZoom: number) => {
    if (!fabricRef.current) return
    const clamped = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, newZoom))
    const center = new fabric.Point(
      fabricRef.current.getWidth() / 2,
      fabricRef.current.getHeight() / 2,
    )
    fabricRef.current.zoomToPoint(center, clamped)
    setZoom(clamped)
  }, [])

  const zoomIn = useCallback(() => applyZoom(zoom + ZOOM_STEP), [zoom, applyZoom])
  const zoomOut = useCallback(() => applyZoom(zoom - ZOOM_STEP), [zoom, applyZoom])
  const zoomReset = useCallback(() => {
    if (!fabricRef.current) return
    fabricRef.current.setViewportTransform([1, 0, 0, 1, 0, 0])
    setZoom(1)
  }, [])

  // ── Pan mode toggle ──

  const togglePanMode = useCallback(() => {
    setIsPanning((prev) => {
      const next = !prev
      isPanningRef.current = next
      if (fabricRef.current) {
        fabricRef.current.selection = !next
        fabricRef.current.defaultCursor = next ? 'grab' : 'default'
        fabricRef.current.forEachObject((o) => {
          o.selectable = !next
          o.evented = !next
        })
      }
      return next
    })
  }, [])

  // ── Canvas initialization ──

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: '#ffffff',
      selection: true,
    })
    fabricRef.current = canvas

    // Load existing data
    if (canvasData && typeof canvasData === 'object' && 'objects' in canvasData) {
      ignoreNextCanvasChange.current = true
      canvas.loadFromJSON(canvasData).then(() => {
        canvas.renderAll()
        ignoreNextCanvasChange.current = false
        pushHistory() // seed history
        setIsReady(true)
      })
    } else {
      pushHistory()
      setIsReady(true)
    }

    // Persist changes
    const handleChange = () => saveToField()
    canvas.on('object:modified', handleChange)
    canvas.on('object:added', handleChange)
    canvas.on('object:removed', handleChange)

    // Selection tracking
    canvas.on('selection:created', (e) => {
      setActiveObjType(e.selected?.[0]?.type || null)
      setSelectionTick((t) => t + 1)
    })
    canvas.on('selection:updated', (e) => {
      setActiveObjType(e.selected?.[0]?.type || null)
      setSelectionTick((t) => t + 1)
    })
    canvas.on('selection:cleared', () => {
      setActiveObjType(null)
      setSelectionTick((t) => t + 1)
    })

    // Ctrl+Scroll zoom
    canvas.on('mouse:wheel', (opt) => {
      const e = opt.e as WheelEvent
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault()
      e.stopPropagation()
      const delta = -e.deltaY / 300
      const newZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, canvas.getZoom() + delta))
      const point = canvas.getScenePoint(e)
      canvas.zoomToPoint(point, newZoom)
      setZoom(newZoom)
    })

    // Pan via drag when pan-mode active
    canvas.on('mouse:down', (opt) => {
      if (!isPanningRef.current) return
      canvas.defaultCursor = 'grabbing'
      const e = opt.e as MouseEvent
      panStartRef.current = { x: e.clientX, y: e.clientY }
    })
    canvas.on('mouse:move', (opt) => {
      if (!isPanningRef.current || !panStartRef.current) return
      const e = opt.e as MouseEvent
      const dx = e.clientX - panStartRef.current.x
      const dy = e.clientY - panStartRef.current.y
      canvas.relativePan(new fabric.Point(dx, dy))
      panStartRef.current = { x: e.clientX, y: e.clientY }
    })
    canvas.on('mouse:up', () => {
      if (!isPanningRef.current) return
      canvas.defaultCursor = 'grab'
      panStartRef.current = null
    })

    return () => {
      canvas.dispose()
      fabricRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Resize canvas when dimension fields change
  useEffect(() => {
    if (!fabricRef.current || !isReady) return
    fabricRef.current.setDimensions({ width: canvasWidth, height: canvasHeight })
    fabricRef.current.renderAll()
  }, [canvasWidth, canvasHeight, isReady])

  // ── Object creation helpers ──

  const addTextbox = useCallback((text: string, options?: Partial<fabric.Textbox>) => {
    if (!fabricRef.current) return
    const textbox = new fabric.Textbox(text, {
      left: 50,
      top: 50,
      width: 300,
      fontSize: 24,
      fontFamily: 'Helvetica',
      fill: '#333333',
      textAlign: 'center',
      ...options,
    })
    fabricRef.current.add(textbox)
    fabricRef.current.setActiveObject(textbox)
    fabricRef.current.renderAll()
  }, [])

  const addPlaceholder = useCallback(
    (placeholder: string) => {
      addTextbox(placeholder, { fontSize: 28, fill: '#1a1a2e', fontWeight: 'bold' })
    },
    [addTextbox],
  )

  const addRect = useCallback(() => {
    if (!fabricRef.current) return
    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      width: 200,
      height: 100,
      fill: '#e8e8e8',
      stroke: '#cccccc',
      strokeWidth: 1,
      rx: 4,
      ry: 4,
    })
    fabricRef.current.add(rect)
    fabricRef.current.setActiveObject(rect)
    fabricRef.current.renderAll()
  }, [])

  const addCircle = useCallback(() => {
    if (!fabricRef.current) return
    const circle = new fabric.Circle({
      left: 50,
      top: 50,
      radius: 50,
      fill: '#e8e8e8',
      stroke: '#cccccc',
      strokeWidth: 1,
    })
    fabricRef.current.add(circle)
    fabricRef.current.setActiveObject(circle)
    fabricRef.current.renderAll()
  }, [])

  const addLine = useCallback(() => {
    if (!fabricRef.current) return
    const line = new fabric.Line([0, 0, 300, 0], {
      left: 50,
      top: 50,
      stroke: '#333333',
      strokeWidth: 2,
    })
    fabricRef.current.add(line)
    fabricRef.current.setActiveObject(line)
    fabricRef.current.renderAll()
  }, [])

  const addImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file || !fabricRef.current) return
      const reader = new FileReader()
      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string
        const img = await fabric.FabricImage.fromURL(dataUrl)
        const maxW = canvasWidth * 0.5
        const maxH = canvasHeight * 0.5
        const scale = Math.min(maxW / (img.width || 1), maxH / (img.height || 1), 1)
        img.scale(scale)
        img.set({ left: 50, top: 50 })
        fabricRef.current!.add(img)
        fabricRef.current!.setActiveObject(img)
        fabricRef.current!.renderAll()
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }, [canvasWidth, canvasHeight])

  // ── Object actions ──

  const deleteSelected = useCallback(() => {
    if (!fabricRef.current) return
    const active = fabricRef.current.getActiveObjects()
    if (active.length) {
      active.forEach((obj) => fabricRef.current!.remove(obj))
      fabricRef.current.discardActiveObject()
      fabricRef.current.renderAll()
    }
  }, [])

  const duplicateSelected = useCallback(async () => {
    if (!fabricRef.current) return
    const obj = fabricRef.current.getActiveObject()
    if (!obj) return
    const cloned = await obj.clone()
    cloned.set({ left: (obj.left || 0) + 20, top: (obj.top || 0) + 20 })
    fabricRef.current.add(cloned)
    fabricRef.current.setActiveObject(cloned)
    fabricRef.current.renderAll()
  }, [])

  const bringForward = useCallback(() => {
    const obj = fabricRef.current?.getActiveObject()
    if (obj) {
      fabricRef.current!.bringObjectForward(obj)
      fabricRef.current!.renderAll()
      saveToField()
    }
  }, [saveToField])

  const sendBackward = useCallback(() => {
    const obj = fabricRef.current?.getActiveObject()
    if (obj) {
      fabricRef.current!.sendObjectBackwards(obj)
      fabricRef.current!.renderAll()
      saveToField()
    }
  }, [saveToField])

  // ── Keyboard shortcuts ──

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when editing text
      const active = fabricRef.current?.getActiveObject()
      if (active && (active as fabric.Textbox).isEditing) return

      if ((e.key === 'Delete' || e.key === 'Backspace') && !e.ctrlKey && !e.metaKey) {
        deleteSelected()
      }
      // Ctrl+Z / Cmd+Z  =  undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      }
      // Ctrl+Shift+Z / Cmd+Shift+Z  =  redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault()
        redo()
      }
      // Ctrl+D  =  duplicate
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault()
        duplicateSelected()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [deleteSelected, undo, redo, duplicateSelected])

  // ── Render ──

  return (
    <div style={{ marginBottom: '2rem' }}>
      <label
        className="field-label"
        style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}
      >
        Certificate Designer
      </label>

      {/* ── Row 1: Toolbar (shapes + actions) ── */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          padding: '0.75rem',
          backgroundColor: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-150)',
          borderBottom: 'none',
          borderRadius: '4px 4px 0 0',
          alignItems: 'center',
        }}
      >
        <ToolGroup label="Shapes">
          <ToolButton onClick={() => addTextbox('Text')} title="Add Text">
            T
          </ToolButton>
          <ToolButton onClick={addRect} title="Add Rectangle">
            ▬
          </ToolButton>
          <ToolButton onClick={addCircle} title="Add Circle">
            ●
          </ToolButton>
          <ToolButton onClick={addLine} title="Add Line">
            ―
          </ToolButton>
          <ToolButton onClick={addImage} title="Add Image">
            🖼
          </ToolButton>
        </ToolGroup>

        <Separator />

        <ToolGroup label="Actions">
          <ToolButton onClick={deleteSelected} title="Delete (Del)" variant="danger">
            Delete
          </ToolButton>
          <ToolButton onClick={duplicateSelected} title="Duplicate (Ctrl+D)">
            Duplicate
          </ToolButton>
          <ToolButton onClick={bringForward} title="Bring Forward">
            ↑
          </ToolButton>
          <ToolButton onClick={sendBackward} title="Send Backward">
            ↓
          </ToolButton>
        </ToolGroup>

        <Separator />

        <ToolGroup label="History">
          <ToolButton onClick={undo} title="Undo (Ctrl+Z)">
            ↩
          </ToolButton>
          <ToolButton onClick={redo} title="Redo (Ctrl+Shift+Z)">
            ↪
          </ToolButton>
        </ToolGroup>

        <Separator />

        <ToolGroup label="View">
          <ToolButton onClick={zoomIn} title="Zoom In">
            +
          </ToolButton>
          <ToolButton onClick={zoomOut} title="Zoom Out">
            −
          </ToolButton>
          <ToolButton onClick={zoomReset} title="Reset Zoom">
            {Math.round(zoom * 100)}%
          </ToolButton>
          <ToolButton
            onClick={togglePanMode}
            title="Toggle Pan Mode"
            variant={isPanning ? 'active' : undefined}
          >
            ✋ Pan
          </ToolButton>
        </ToolGroup>
      </div>

      {/* ── Row 2: Placeholders ── */}
      <div
        style={{
          ...rowStyle,
          borderTop: 'none',
          gap: '6px',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            color: 'var(--theme-elevation-400)',
            fontWeight: 600,
            marginRight: '4px',
          }}
        >
          Placeholders
        </span>
        {PLACEHOLDERS.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => addPlaceholder(p.value)}
            title={`Insert ${p.label} — ${p.value}`}
            style={{
              padding: '3px 8px',
              fontSize: '11px',
              border: '1px dashed var(--theme-elevation-300)',
              borderRadius: '3px',
              backgroundColor: 'var(--theme-elevation-0)',
              color: 'var(--theme-text)',
              cursor: 'pointer',
              lineHeight: 1.4,
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ── Row 3: Property panel (conditional) ── */}
      {activeObjType && (
        <ActiveObjectProperties
          canvas={fabricRef.current}
          onSave={saveToField}
          tick={selectionTick}
        />
      )}

      {/* ── Canvas viewport ── */}
      <div
        style={{
          border: '1px solid var(--theme-elevation-150)',
          borderTop: 'none',
          borderRadius: '0 0 4px 4px',
          overflow: 'auto',
          maxHeight: '650px',
          backgroundColor: '#e8e8e8',
          padding: '1rem',
        }}
      >
        <div style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'inline-block' }}>
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* ── Help text ── */}
      <p style={{ marginTop: '0.5rem', fontSize: '12px', color: 'var(--theme-elevation-500)' }}>
        <strong>Controls:</strong> Ctrl+Scroll to zoom · Pan mode (✋) for dragging · Delete to
        remove · Ctrl+Z / Ctrl+Shift+Z to undo / redo · Ctrl+D to duplicate. Placeholders like{' '}
        {'{{studentName}}'} are replaced with real values in the final certificate.
      </p>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────────────

function Separator() {
  return (
    <div
      style={{
        width: 1,
        height: 24,
        backgroundColor: 'var(--theme-elevation-200)',
        margin: '0 2px',
      }}
    />
  )
}

function ToolGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
      <span
        style={{
          fontSize: '10px',
          textTransform: 'uppercase',
          color: 'var(--theme-elevation-400)',
          marginRight: '4px',
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

function ToolButton({
  onClick,
  title,
  children,
  variant,
  style,
}: {
  onClick: () => void
  title: string
  children: React.ReactNode
  variant?: 'danger' | 'active'
  style?: React.CSSProperties
}) {
  const bgMap: Record<string, string> = {
    danger: 'var(--theme-error-500)',
    active: 'var(--theme-elevation-300)',
  }
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        padding: '4px 10px',
        fontSize: '13px',
        border: '1px solid var(--theme-elevation-200)',
        borderRadius: '3px',
        backgroundColor: (variant && bgMap[variant]) || 'var(--theme-elevation-0)',
        color: variant === 'danger' ? '#fff' : 'var(--theme-text)',
        cursor: 'pointer',
        lineHeight: 1.4,
        ...style,
      }}
    >
      {children}
    </button>
  )
}

// ── Inline property label ──

function PropLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
      {children}
    </label>
  )
}

// ── Property panel ──

function ActiveObjectProperties({
  canvas,
  onSave,
  tick: _tick,
}: {
  canvas: fabric.Canvas | null
  onSave: () => void
  tick: number
}) {
  // ── State: all objects ──
  const [fill, setFill] = useState('#333333')
  const [opacity, setOpacity] = useState(1)
  const [stroke, setStroke] = useState('#000000')
  const [strokeWidth, setStrokeWidth] = useState(0)
  const [angle, setAngle] = useState(0)
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)

  // ── State: text objects ──
  const [fontSize, setFontSize] = useState(24)
  const [fontFamily, setFontFamily] = useState('Helvetica')
  const [textAlign, setTextAlign] = useState('center')
  const [fontWeight, setFontWeight] = useState<string>('normal')
  const [fontStyle, setFontStyle] = useState<string>('normal')
  const [underline, setUnderline] = useState(false)
  const [linethrough, setLinethrough] = useState(false)
  const [charSpacing, setCharSpacing] = useState(0)
  const [lineHeight, setLineHeight] = useState(1.16)

  // ── State: rect ──
  const [rx, setRx] = useState(0)

  // ── Refresh state from active object ──

  const refreshFromObject = useCallback(() => {
    if (!canvas) return
    const obj = canvas.getActiveObject()
    if (!obj) return

    setFill((obj.fill as string) || '#333333')
    setOpacity(obj.opacity ?? 1)
    setStroke((obj.stroke as string) || '#000000')
    setStrokeWidth(obj.strokeWidth ?? 0)
    setAngle(Math.round(obj.angle || 0))
    setPosX(Math.round(obj.left || 0))
    setPosY(Math.round(obj.top || 0))

    if (isTextType(obj.type)) {
      const t = obj as fabric.Textbox
      setFontSize(t.fontSize || 24)
      setFontFamily(t.fontFamily || 'Helvetica')
      setTextAlign(t.textAlign || 'center')
      setFontWeight(String(t.fontWeight || 'normal'))
      setFontStyle(t.fontStyle || 'normal')
      setUnderline(t.underline || false)
      setLinethrough(t.linethrough || false)
      setCharSpacing(t.charSpacing || 0)
      setLineHeight(t.lineHeight ?? 1.16)
    }

    if (obj.type === 'rect') {
      setRx((obj as fabric.Rect).rx || 0)
    }
  }, [canvas])

  useEffect(() => {
    refreshFromObject()
    if (!canvas) return
    const h = () => refreshFromObject()
    canvas.on('selection:created', h)
    canvas.on('selection:updated', h)
    canvas.on('object:modified', h)
    return () => {
      canvas.off('selection:created', h)
      canvas.off('selection:updated', h)
      canvas.off('object:modified', h)
    }
  }, [canvas, refreshFromObject])

  const apply = useCallback(
    (prop: string, value: unknown) => {
      if (!canvas) return
      const obj = canvas.getActiveObject()
      if (!obj) return
      obj.set(prop as keyof fabric.FabricObject, value)
      canvas.renderAll()
      onSave()
    },
    [canvas, onSave],
  )

  const obj = canvas?.getActiveObject()
  const isText = obj ? isTextType(obj.type) : false
  const isRect = obj?.type === 'rect'

  return (
    <div style={{ ...rowStyle, backgroundColor: 'var(--theme-elevation-100)', gap: '0.75rem' }}>
      {/* ── Position / Transform ── */}
      <PropLabel>
        X:
        <input
          type="number"
          value={posX}
          onChange={(e) => {
            const v = Number(e.target.value)
            setPosX(v)
            apply('left', v)
          }}
          style={inputSmall}
        />
      </PropLabel>
      <PropLabel>
        Y:
        <input
          type="number"
          value={posY}
          onChange={(e) => {
            const v = Number(e.target.value)
            setPosY(v)
            apply('top', v)
          }}
          style={inputSmall}
        />
      </PropLabel>
      <PropLabel>
        Angle:
        <input
          type="number"
          value={angle}
          min={0}
          max={360}
          onChange={(e) => {
            const v = Number(e.target.value)
            setAngle(v)
            apply('angle', v)
          }}
          style={{ ...inputSmall, width: 50 }}
        />
        °
      </PropLabel>

      <Separator />

      {/* ── Appearance ── */}
      <PropLabel>
        Fill:
        <input
          type="color"
          value={fill}
          onChange={(e) => {
            setFill(e.target.value)
            apply('fill', e.target.value)
          }}
          style={{ width: 28, height: 22, border: 'none', cursor: 'pointer' }}
        />
      </PropLabel>
      <PropLabel>
        Opacity:
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={opacity}
          onChange={(e) => {
            const v = Number(e.target.value)
            setOpacity(v)
            apply('opacity', v)
          }}
          style={{ width: 60, cursor: 'pointer' }}
        />
        <span style={{ fontSize: '11px', width: 30 }}>{Math.round(opacity * 100)}%</span>
      </PropLabel>
      <PropLabel>
        Stroke:
        <input
          type="color"
          value={stroke}
          onChange={(e) => {
            setStroke(e.target.value)
            apply('stroke', e.target.value)
          }}
          style={{ width: 28, height: 22, border: 'none', cursor: 'pointer' }}
        />
      </PropLabel>
      <PropLabel>
        Width:
        <input
          type="number"
          value={strokeWidth}
          min={0}
          max={50}
          onChange={(e) => {
            const v = Number(e.target.value)
            setStrokeWidth(v)
            apply('strokeWidth', v)
          }}
          style={{ ...inputSmall, width: 45 }}
        />
      </PropLabel>

      {/* ── Rect-specific ── */}
      {isRect && (
        <>
          <Separator />
          <PropLabel>
            Radius:
            <input
              type="number"
              value={rx}
              min={0}
              max={200}
              onChange={(e) => {
                const v = Number(e.target.value)
                setRx(v)
                apply('rx', v)
                apply('ry', v)
              }}
              style={{ ...inputSmall, width: 45 }}
            />
          </PropLabel>
        </>
      )}

      {/* ── Text-specific ── */}
      {isText && (
        <>
          <Separator />

          <PropLabel>
            Size:
            <input
              type="number"
              value={fontSize}
              min={8}
              max={200}
              onChange={(e) => {
                const v = Number(e.target.value)
                setFontSize(v)
                apply('fontSize', v)
              }}
              style={inputSmall}
            />
          </PropLabel>

          <PropLabel>
            Font:
            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value)
                apply('fontFamily', e.target.value)
              }}
              style={selectSmall}
            >
              <option value="Helvetica">Helvetica</option>
              <option value="Times-Roman">Times Roman</option>
              <option value="Courier">Courier</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
              <option value="Arial">Arial</option>
            </select>
          </PropLabel>

          <PropLabel>
            Align:
            <select
              value={textAlign}
              onChange={(e) => {
                setTextAlign(e.target.value)
                apply('textAlign', e.target.value)
              }}
              style={selectSmall}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </PropLabel>

          <ToolButton
            onClick={() => {
              const n = fontWeight === 'bold' ? 'normal' : 'bold'
              setFontWeight(n)
              apply('fontWeight', n)
            }}
            title="Bold"
            style={{ fontWeight: fontWeight === 'bold' ? 'bold' : 'normal', minWidth: 28 }}
          >
            B
          </ToolButton>
          <ToolButton
            onClick={() => {
              const n = fontStyle === 'italic' ? 'normal' : 'italic'
              setFontStyle(n)
              apply('fontStyle', n)
            }}
            title="Italic"
            style={{ fontStyle: fontStyle === 'italic' ? 'italic' : 'normal', minWidth: 28 }}
          >
            I
          </ToolButton>
          <ToolButton
            onClick={() => {
              setUnderline(!underline)
              apply('underline', !underline)
            }}
            title="Underline"
            variant={underline ? 'active' : undefined}
            style={{ textDecoration: underline ? 'underline' : 'none', minWidth: 28 }}
          >
            U
          </ToolButton>
          <ToolButton
            onClick={() => {
              setLinethrough(!linethrough)
              apply('linethrough', !linethrough)
            }}
            title="Strikethrough"
            variant={linethrough ? 'active' : undefined}
            style={{ textDecoration: linethrough ? 'line-through' : 'none', minWidth: 28 }}
          >
            S
          </ToolButton>

          <PropLabel>
            Spacing:
            <input
              type="number"
              value={charSpacing}
              min={-500}
              max={2000}
              step={10}
              onChange={(e) => {
                const v = Number(e.target.value)
                setCharSpacing(v)
                apply('charSpacing', v)
              }}
              style={{ ...inputSmall, width: 60 }}
            />
          </PropLabel>

          <PropLabel>
            Line H:
            <input
              type="number"
              value={lineHeight}
              min={0.5}
              max={5}
              step={0.05}
              onChange={(e) => {
                const v = Number(e.target.value)
                setLineHeight(v)
                apply('lineHeight', v)
              }}
              style={{ ...inputSmall, width: 55 }}
            />
          </PropLabel>
        </>
      )}
    </div>
  )
}

function isTextType(type: string | undefined): boolean {
  return type === 'textbox' || type === 'i-text' || type === 'text'
}
