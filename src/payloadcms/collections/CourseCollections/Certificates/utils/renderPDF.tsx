import React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer'

interface CanvasObject {
  type: string
  left?: number
  top?: number
  width?: number
  height?: number
  scaleX?: number
  scaleY?: number
  angle?: number
  text?: string
  fontSize?: number
  fontFamily?: string
  fontWeight?: string | number
  fontStyle?: string
  fill?: string
  textAlign?: string
  underline?: boolean
  linethrough?: boolean
  opacity?: number
  src?: string
  rx?: number
  ry?: number
  radius?: number
  stroke?: string
  strokeWidth?: number
}

interface CanvasData {
  objects?: CanvasObject[]
  [key: string]: unknown
}

interface RenderOptions {
  canvasData: Record<string, unknown>
  width: number
  height: number
  backgroundImageUrl?: string
  substitutions: Record<string, string>
}

function applySubstitutions(text: string, substitutions: Record<string, string>): string {
  let result = text
  for (const [placeholder, value] of Object.entries(substitutions)) {
    result = result.replaceAll(placeholder, value)
  }
  return result
}

function mapFontWeight(
  weight: string | number | undefined,
):
  | 'normal'
  | 'bold'
  | 'ultrabold'
  | 'light'
  | 'thin'
  | 'medium'
  | 'semibold'
  | 'extralight'
  | 'hairline'
  | 'heavy'
  | 'black' {
  if (!weight) return 'normal'
  if (typeof weight === 'number') {
    if (weight >= 700) return 'bold'
    if (weight >= 600) return 'semibold'
    if (weight >= 500) return 'medium'
    if (weight <= 300) return 'light'
    return 'normal'
  }
  if (weight === 'bold') return 'bold'
  return 'normal'
}

function mapTextAlign(align: string | undefined): 'left' | 'center' | 'right' | 'justify' {
  if (align === 'center' || align === 'right' || align === 'justify') return align
  return 'left'
}

// Convert pixel values to PDF points (72 DPI target for PDF, canvas is 96 DPI)
const PX_TO_PT = 72 / 96

function CertificateDocument({
  canvasData,
  width,
  height,
  backgroundImageUrl,
  substitutions,
}: RenderOptions) {
  const data = canvasData as CanvasData
  const objects = data.objects || []

  const pageWidth = width * PX_TO_PT
  const pageHeight = height * PX_TO_PT

  return (
    <Document>
      <Page size={{ width: pageWidth, height: pageHeight }} style={styles.page}>
        {/* Background image */}
        {backgroundImageUrl && (
          <Image
            src={backgroundImageUrl}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: pageWidth,
              height: pageHeight,
            }}
          />
        )}

        {/* Render each canvas object */}
        {objects.map((obj, index) => {
          const x = (obj.left || 0) * PX_TO_PT
          const y = (obj.top || 0) * PX_TO_PT
          const sX = obj.scaleX || 1
          const sY = obj.scaleY || 1

          if (obj.type === 'textbox' || obj.type === 'text' || obj.type === 'i-text') {
            const rawText = obj.text || ''
            const displayText = applySubstitutions(rawText, substitutions)
            const fontSize = (obj.fontSize || 16) * PX_TO_PT * sX
            const objWidth = obj.width ? obj.width * PX_TO_PT * sX : undefined

            return (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: objWidth,
                  opacity: obj.opacity ?? 1,
                  transform: obj.angle ? `rotate(${obj.angle}deg)` : undefined,
                }}
              >
                <Text
                  style={{
                    fontSize,
                    fontWeight: mapFontWeight(obj.fontWeight),
                    fontStyle: obj.fontStyle === 'italic' ? 'italic' : 'normal',
                    color: (obj.fill as string) || '#000000',
                    textAlign: mapTextAlign(obj.textAlign),
                    textDecoration: obj.underline
                      ? 'underline'
                      : obj.linethrough
                        ? 'line-through'
                        : 'none',
                  }}
                >
                  {displayText}
                </Text>
              </View>
            )
          }

          if (obj.type === 'image') {
            const imgWidth = (obj.width || 100) * PX_TO_PT * sX
            const imgHeight = (obj.height || 100) * PX_TO_PT * sY

            return (
              <Image
                key={index}
                src={obj.src || ''}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: imgWidth,
                  height: imgHeight,
                  opacity: obj.opacity ?? 1,
                  transform: obj.angle ? `rotate(${obj.angle}deg)` : undefined,
                }}
              />
            )
          }

          if (obj.type === 'rect') {
            const rectWidth = (obj.width || 100) * PX_TO_PT * sX
            const rectHeight = (obj.height || 100) * PX_TO_PT * sY

            return (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: rectWidth,
                  height: rectHeight,
                  backgroundColor: (obj.fill as string) || 'transparent',
                  borderRadius: (obj.rx || 0) * PX_TO_PT,
                  opacity: obj.opacity ?? 1,
                  borderColor: obj.stroke || 'transparent',
                  borderWidth: obj.strokeWidth ? obj.strokeWidth * PX_TO_PT : 0,
                  transform: obj.angle ? `rotate(${obj.angle}deg)` : undefined,
                }}
              />
            )
          }

          if (obj.type === 'circle') {
            const r = (obj.radius || 50) * PX_TO_PT * sX
            const diameter = r * 2

            return (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  left: x - r,
                  top: y - r,
                  width: diameter,
                  height: diameter,
                  backgroundColor: (obj.fill as string) || 'transparent',
                  borderRadius: r,
                  opacity: obj.opacity ?? 1,
                  borderColor: obj.stroke || 'transparent',
                  borderWidth: obj.strokeWidth ? obj.strokeWidth * PX_TO_PT : 0,
                  transform: obj.angle ? `rotate(${obj.angle}deg)` : undefined,
                }}
              />
            )
          }

          if (obj.type === 'line') {
            const lineWidth = (obj.width || 100) * PX_TO_PT * sX
            const lineHeight = (obj.strokeWidth || 1) * PX_TO_PT

            return (
              <View
                key={index}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: lineWidth,
                  height: lineHeight,
                  backgroundColor: (obj.stroke as string) || '#000000',
                  opacity: obj.opacity ?? 1,
                  transform: obj.angle ? `rotate(${obj.angle}deg)` : undefined,
                }}
              />
            )
          }

          return null
        })}
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
})

export async function renderCertificatePDF(options: RenderOptions): Promise<Buffer> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = React.createElement(CertificateDocument, options) as any
  const buffer = await renderToBuffer(element)
  return Buffer.from(buffer)
}
