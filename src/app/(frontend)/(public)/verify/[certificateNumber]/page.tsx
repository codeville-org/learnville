import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import Link from 'next/link'

type Params = Promise<{ certificateNumber: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { certificateNumber } = await params
  return {
    title: `Verify Certificate ${certificateNumber} | Learnville`,
    description: `Verify the authenticity of certificate ${certificateNumber}`,
  }
}

export default async function VerifyCertificatePage({ params }: { params: Params }) {
  const { certificateNumber } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'certificates',
    where: {
      certificateNumber: { equals: certificateNumber },
    },
    depth: 1,
    limit: 1,
    overrideAccess: true,
  })

  const certificate = docs[0]

  if (!certificate) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-8">
          <div className="mb-4 text-5xl">❌</div>
          <h1 className="mb-2 text-2xl font-bold text-red-800">Certificate Not Found</h1>
          <p className="mb-6 text-red-600">
            No certificate with number <strong>{certificateNumber}</strong> was found. Please
            double-check the certificate number and try again.
          </p>
          <Link
            href="/"
            className="inline-block rounded-md bg-red-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  const issuedDate = certificate.issuedAt
    ? new Date(certificate.issuedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A'

  const completionDate = certificate.completionDate
    ? new Date(certificate.completionDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A'

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-lg rounded-xl border border-green-200 bg-white p-8 shadow-lg">
        {/* Verified badge */}
        <div className="mb-6 text-center">
          <div className="mb-2 text-5xl">✅</div>
          <h1 className="text-2xl font-bold text-green-800">Certificate Verified</h1>
          <p className="mt-1 text-sm text-gray-500">
            This certificate is authentic and was issued by Learnville.
          </p>
        </div>

        {/* Certificate details */}
        <div className="space-y-4 rounded-lg bg-gray-50 p-6">
          <DetailRow label="Certificate Number" value={certificate.certificateNumber} />
          <DetailRow label="Student Name" value={certificate.studentName || 'N/A'} />
          <DetailRow label="Course" value={certificate.courseName || 'N/A'} />
          <DetailRow label="Instructor" value={certificate.instructorName || 'N/A'} />
          <DetailRow label="Completed On" value={completionDate} />
          <DetailRow label="Issued On" value={issuedDate} />
          {certificate.totalXPEarned ? (
            <DetailRow label="XP Earned" value={`${certificate.totalXPEarned} XP`} />
          ) : null}
        </div>

        {/* Download button */}
        <div className="mt-6 text-center">
          <a
            href={`/api/certificates/${certificate.certificateNumber}/download`}
            className="inline-block rounded-md bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            Download Certificate (PDF)
          </a>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-right text-sm font-semibold text-gray-900">{value}</span>
    </div>
  )
}
