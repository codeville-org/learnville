import React from 'react'
import Link from 'next/link'
import { Download, FileText, FileSpreadsheet, FileCode, Archive, File } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { BlockRendererProps, LessonMaterialsBlock } from '../types'

const fileTypeIcons = {
  pdf: FileText,
  doc: FileText,
  sheet: FileSpreadsheet,
  code: FileCode,
  archive: Archive,
  other: File,
}

export function LessonMaterialsRenderer({ data }: BlockRendererProps<LessonMaterialsBlock>) {
  return (
    <div className="space-y-6">
      {data.materialsTitle && (
        <h2 className="text-2xl font-bold text-gray-900">{data.materialsTitle}</h2>
      )}

      {data.materials && data.materials.length > 0 ? (
        <div className="grid gap-4">
          {data.materials.map((material: any, index: number) => {
            const Icon = fileTypeIcons[material.fileType as keyof typeof fileTypeIcons] || File
            const fileData = typeof material.file === 'object' ? material.file : null

            return (
              <div
                key={material.id || index}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{material.materialName}</h3>
                  {material.description && (
                    <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                  )}
                  {fileData && (
                    <p className="text-xs text-gray-500 mt-2">
                      {fileData.filename} •{' '}
                      {fileData.filesize
                        ? `${(fileData.filesize / 1024).toFixed(2)} KB`
                        : 'Unknown size'}
                    </p>
                  )}
                </div>

                {fileData?.url && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={fileData.url} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Link>
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No materials available</p>
      )}
    </div>
  )
}
