import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { XIcon, TikTokIcon } from "@/components/brand-icons"
import { LocationInterestForm } from "@/components/location-interest-form"
import {
  ADDRESS_LINE,
  CITY_STATE,
  PHONE_DISPLAY,
  PHONE_TEL,
  SUPPORT_EMAIL,
  WHATSAPP_URL,
} from "@/lib/contact"

const socialLinks = [
  { name: "X", href: "https://x.com/laundryfica", Icon: XIcon },
  { name: "Facebook", href: "https://www.facebook.com/share/1BjDbK7WGu/", Icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/laundryfica", Icon: Instagram },
  { name: "TikTok", href: "https://tiktok.com/@laundryfica", Icon: TikTokIcon },
  { name: "YouTube", href: "https://youtube.com/@laundryfica", Icon: Youtube },
]

export function SiteFooter() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">Laundryfica</span>
                <span className="text-xs text-muted-foreground leading-none">your effortless pristine fabric care</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Experience premium laundry services with Laundryfica. your effortless pristine fabric care is our commitment to
              excellence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary">
                  What We Do
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary">
                  Prices
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-muted-foreground hover:text-primary">
                  Book a Pickup
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-primary">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact Info</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={`tel:${PHONE_TEL}`} className="hover:text-primary">
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 flex-shrink-0" />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Chat on WhatsApp
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-primary">
                  {SUPPORT_EMAIL}
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  {ADDRESS_LINE}
                  <br />
                  {CITY_STATE}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Not-yet-open second branch. Kept visually separate so it can never
            read as an address we currently operate from. */}
        <div className="border-t mt-8 pt-8">
          <div className="max-w-md">
            <h3 className="font-semibold mb-3">Coming soon</h3>
            <LocationInterestForm compact />
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Laundryfica. All rights reserved. your effortless pristine fabric care.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
