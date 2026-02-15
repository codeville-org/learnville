import type { Endpoint } from 'payload'
import { renderCertificatePDF } from '../utils/renderPDF'

export const downloadCertificateEndpoint: Endpoint = {
  path: '/:certificateNumber/download',
  method: 'get',
  handler: async (req) => {
    const { certificateNumber } = req.routeParams as { certificateNumber: string }

    // Find certificate by number
    const { docs } = await req.payload.find({
      collection: 'certificates',
      where: {
        certificateNumber: { equals: certificateNumber },
      },
      depth: 1,
      limit: 1,
    })

    if (!docs.length) {
      return Response.json({ error: 'Certificate not found' }, { status: 404 })
    }

    const certificate = docs[0]

    // Get the template with canvas data
    const templateId =
      typeof certificate.template === 'object' ? certificate.template.id : certificate.template

    const template = await req.payload.findByID({
      collection: 'certificate-templates',
      id: templateId,
      depth: 1,
    })

    if (!template || !template.canvasData) {
      return Response.json(
        { error: 'Certificate template not found or has no design' },
        { status: 404 },
      )
    }

    // Get background image URL if exists
    let backgroundImageUrl: string | undefined
    if (template.backgroundImage && typeof template.backgroundImage === 'object') {
      backgroundImageUrl = (template.backgroundImage as { url?: string }).url || undefined
    }

    // Build substitution map
    const substitutions: Record<string, string> = {
      '{{studentName}}': certificate.studentName || '',
      '{{courseName}}': certificate.courseName || '',
      '{{instructorName}}': certificate.instructorName || '',
      '{{certificateNumber}}': certificate.certificateNumber || '',
      '{{completionDate}}': certificate.completionDate
        ? new Date(certificate.completionDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '',
      '{{totalXP}}': String(certificate.totalXPEarned || 0),
      '{{issuedAt}}': certificate.issuedAt
        ? new Date(certificate.issuedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '',
    }

    try {
      const pdfBuffer = await renderCertificatePDF({
        canvasData: template.canvasData as Record<string, unknown>,
        width: template.canvasWidth || 1122,
        height: template.canvasHeight || 793,
        backgroundImageUrl,
        substitutions,
      })

      return new Response(new Uint8Array(pdfBuffer), {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="certificate-${certificateNumber}.pdf"`,
          'Cache-Control': 'public, max-age=3600',
        },
      })
    } catch (error) {
      console.error('PDF generation error:', error)
      return Response.json({ error: 'Failed to generate PDF' }, { status: 500 })
    }
  },
}
