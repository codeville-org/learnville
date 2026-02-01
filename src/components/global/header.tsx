'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Menu, X, ChevronDown, ShoppingCart, UserIcon, User2Icon } from 'lucide-react'

import type { Customer, Header as HeaderType, User } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  data: HeaderType
  user:
    | (User & {
        collection: 'users'
      })
    | (Customer & {
        collection: 'customers'
      })
    | null
}

const bgColorMap = {
  teal: 'bg-teal-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
  orange: 'bg-orange-500',
}

function getNavigationLinkHref(link: any): string {
  if (link.type === 'page' && link.page) {
    return `/${link.page.slug}`
  }
  if ((link.type === 'external' || link.type === 'custom') && link.url) {
    return link.url
  }
  return '#'
}

export function Header({ data, user }: Props) {
  const [bannerVisible, setBannerVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Check if user is authenticated (you'll need to implement this based on your auth)
  const isAuthenticated = Boolean(user)

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Banner */}
      {data.topBanner?.enabled && bannerVisible && (
        <div
          className={`${bgColorMap[data.topBanner.backgroundColor as keyof typeof bgColorMap] || 'bg-teal-500'} text-white`}
        >
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex-1 text-center text-sm">
              <RichText data={data.topBanner.message} />
            </div>

            {data.topBanner.closeable && (
              <button
                onClick={() => setBannerVisible(false)}
                className="ml-4 hover:bg-white/20 rounded p-1"
                aria-label="Close banner"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              {data.logo?.image && typeof data.logo.image === 'object' && (
                <Image
                  src={data.logo.image.url || ''}
                  alt={data.logo.alt || 'Logo'}
                  width={100}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 flex-1">
              {/* Explore Dropdown */}
              {data.exploreMenu?.enabled && (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-emerald-600/10 text-gray-700 hover:text-emerald-600 font-medium">
                        {data.exploreMenu.label || 'Explore'}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[400px] p-4">
                          <div className="grid gap-2">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">
                              Explore by Category
                            </h4>
                            {data.exploreMenu.categories?.map(
                              (category, index) =>
                                category instanceof Object && (
                                  <NavigationMenuLink key={index} asChild>
                                    <Link
                                      href={`/courses?category=${category.slug}`}
                                      className="block px-4 py-2 rounded-md hover:bg-emerald-50 transition-colors"
                                    >
                                      <div className="font-medium text-gray-900">
                                        {category.name}
                                      </div>
                                      {category.description && (
                                        <div className="text-xs text-gray-500 mt-1">
                                          {category.description}
                                        </div>
                                      )}
                                    </Link>
                                  </NavigationMenuLink>
                                ),
                            )}
                            {data.exploreMenu.viewAllLink?.enabled && (
                              <Link
                                href={`/${(data.exploreMenu.viewAllLink.page as any)?.slug || 'categories'}`}
                                className="block px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 mt-2"
                              >
                                {data.exploreMenu.viewAllLink.label || 'View All Categories'} →
                              </Link>
                            )}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              )}

              {/* Navigation Links */}
              {data.navigationLinks?.map((link) => (
                <Link
                  key={link.id}
                  href={getNavigationLinkHref(link)}
                  target={link.openInNewTab ? '_blank' : undefined}
                  rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="text-gray-700 hover:text-emerald-600 font-medium text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Search Bar */}
              {data.search?.enabled && (
                <div className="flex-1 max-w-2xl">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="search"
                      placeholder={data.search.placeholder || 'Search for anything'}
                      className="w-full pl-10 pr-4 h-11 border-gray-300 rounded-full focus-visible:ring-emerald-500"
                    />
                  </div>
                </div>
              )}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* CTA Buttons - Desktop */}
              <div className="hidden lg:flex items-center gap-2">
                {!isAuthenticated ? (
                  <>
                    <Button
                      variant="ghost"
                      className="h-11 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-emerald-100"
                      asChild
                    >
                      <Link href={data.ctaButtons?.loginButton?.url || '/login'}>
                        {data.ctaButtons?.loginButton?.label || 'Log in'}
                      </Link>
                    </Button>
                    <Button
                      className="h-11 bg-emerald-600 hover:bg-emerald-700 rounded-full text-white hover:text-white"
                      asChild
                    >
                      <Link href={data.ctaButtons?.signupButton?.url || '/signup'}>
                        {data.ctaButtons?.signupButton?.label || 'Sign up'}
                      </Link>
                    </Button>
                  </>
                ) : user?.collection === 'customers' ? (
                  <Button
                    variant="ghost"
                    className="h-11 bg-emerald-600 hover:bg-emerald-700 rounded-full text-white hover:text-white"
                    asChild
                  >
                    <Link href={data.ctaButtons?.myAccountButton?.url || '/portal'}>
                      <User2Icon />

                      {data.ctaButtons?.myAccountButton?.label || 'My Account'}
                    </Link>
                  </Button>
                ) : user?.collection === 'users' ? (
                  <Button
                    variant="ghost"
                    className="h-11 bg-emerald-600 hover:bg-emerald-700 rounded-full text-white hover:text-white"
                    asChild
                  >
                    <Link href={'/admin'} target="_blank" rel="noopener noreferrer">
                      {'Dashboard'}
                    </Link>
                  </Button>
                ) : null}
              </div>

              {/* Mobile Menu Toggle */}
              {data.mobileMenu?.enabled && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && data.mobileMenu?.enabled && (
        <div className="lg:hidden border-b bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            {data.search?.enabled && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder={data.search.placeholder || 'Search for anything'}
                  className="w-full pl-10 pr-4 h-11"
                />
              </div>
            )}

            {/* Mobile Explore */}
            {data.exploreMenu?.enabled && (
              <div className="space-y-2">
                <div className="font-semibold text-gray-900">
                  {data.exploreMenu.label || 'Explore'}
                </div>
                {data.exploreMenu.categories?.map(
                  (category) =>
                    category instanceof Object && (
                      <Link
                        key={category.id}
                        href={`/courses?category=${category.slug}`}
                        className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ),
                )}
              </div>
            )}

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {data.navigationLinks?.map((link) => (
                <Link
                  key={link.id}
                  href={getNavigationLinkHref(link)}
                  target={link.openInNewTab ? '_blank' : undefined}
                  rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="pt-4 border-t space-y-2">
              {!isAuthenticated ? (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={data.ctaButtons?.loginButton?.url || '/login'}>
                      {data.ctaButtons?.loginButton?.label || 'Log in'}
                    </Link>
                  </Button>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800" asChild>
                    <Link href={data.ctaButtons?.signupButton?.url || '/signup'}>
                      {data.ctaButtons?.signupButton?.label || 'Sign up'}
                    </Link>
                  </Button>
                </>
              ) : (
                <Button variant="outline" className="w-full" asChild>
                  <Link href={data.ctaButtons?.myAccountButton?.url || '/account'}>
                    {data.ctaButtons?.myAccountButton?.label || 'My Account'}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
