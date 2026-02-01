import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Footer as FooterType } from '@/payload-types'
import { getNavigationLinkHref } from '@/lib/utils'

interface Props {
  data: FooterType
}

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  github: Github,
}

export async function Footer({ data }: Props) {
  const footer = data

  return (
    <footer className="border-t bg-white">
      <div className="h-full w-full bg-linear-to-b from-orange-200/10 to-green-200/10 from-25% to-75% ">
        {/* Top Section */}
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
            {/* Logo and Tagline */}
            <div className="lg:col-span-4">
              {footer.logo && typeof footer.logo === 'object' && (
                <Link href="/" className="inline-block mb-4">
                  <Image
                    src={footer.logo.url || ''}
                    alt={footer.logo.alt || 'Logo'}
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
              )}
              <p className="text-gray-600 text-sm leading-relaxed">{footer.tagline}</p>
            </div>

            {/* Social Media */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {footer.socials?.map((social) => {
                  const Icon = socialIcons[social.platform as keyof typeof socialIcons]
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-colors"
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {footer.newsletter?.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{footer.newsletter?.description}</p>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder={footer?.newsletter?.placeholder || 'Your email address'}
                  className="flex-1 h-12 bg-white shadow-none"
                  required
                />
                <Button type="submit" className="h-12 bg-emerald-500 hover:bg-emerald-600">
                  {footer.newsletter?.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t">
            {footer.linkColumns?.map((column) => (
              <div key={column.id}>
                <h4 className="font-semibold text-gray-900 mb-4">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links?.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={
                          link.type === 'category'
                            ? `/courses?category=${link.category instanceof Object ? link.category.slug : ''}`
                            : getNavigationLinkHref(link)
                        }
                        className="text-gray-600 hover:text-emerald-500 text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Info */}
            {footer.contactInfo && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">{footer.contactInfo.title}</h4>
                <ul className="space-y-3 text-sm">
                  {footer.contactInfo.email && (
                    <li>
                      <span className="text-gray-500">Email:</span>
                      <br />
                      <a
                        href={`mailto:${footer.contactInfo.email}`}
                        className="text-emerald-500 hover:text-emerald-600"
                      >
                        {footer.contactInfo.email}
                      </a>
                    </li>
                  )}
                  {footer.contactInfo.phone && (
                    <li>
                      <span className="text-gray-500">Phone:</span>
                      <br />
                      <a
                        href={`tel:${footer.contactInfo.phone.replace(/\s/g, '')}`}
                        className="text-emerald-500 hover:text-emerald-600"
                      >
                        {footer.contactInfo.phone}
                      </a>
                    </li>
                  )}
                  {footer.contactInfo.address && (
                    <li>
                      <span className="text-gray-500">Address:</span>
                      <br />
                      <span className="text-gray-600">{footer.contactInfo.address}</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
              <p>
                © {new Date().getFullYear()}{' '}
                <Link href="/" className="text-emerald-500 hover:text-emerald-600 font-medium">
                  CodeVille
                </Link>
                . {footer.copyright?.text}
              </p>
              <p>{footer.copyright?.designer}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
