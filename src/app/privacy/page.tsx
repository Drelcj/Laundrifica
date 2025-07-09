"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl font-bold gradient-text mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: May 2, 2023</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8 glass-card p-8 rounded-2xl"
        >
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to Laundrilab. We respect your privacy and are committed to protecting your personal data. This
              privacy policy will inform you about how we look after your personal data when you visit our website and
              tell you about your privacy rights and how the law protects you.
            </p>
            <p>
              This privacy policy aims to give you information on how Laundrilab collects and processes your personal
              data through your use of this website, including any data you may provide through this website when you
              sign up for our service, place an order, or take part in a promotion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
            <p className="mb-4">
              Personal data, or personal information, means any information about an individual from which that person
              can be identified. It does not include data where the identity has been removed (anonymous data).
            </p>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped
              together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Identity Data</strong> includes first name, last name, username or similar identifier.
              </li>
              <li>
                <strong>Contact Data</strong> includes billing address, delivery address, email address and telephone
                numbers.
              </li>
              <li>
                <strong>Financial Data</strong> includes payment card details.
              </li>
              <li>
                <strong>Transaction Data</strong> includes details about payments to and from you and other details of
                products and services you have purchased from us.
              </li>
              <li>
                <strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type
                and version, time zone setting and location, browser plug-in types and versions, operating system and
                platform, and other technology on the devices you use to access this website.
              </li>
              <li>
                <strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your
                preferences, feedback and survey responses.
              </li>
              <li>
                <strong>Usage Data</strong> includes information about how you use our website, products and services.
              </li>
              <li>
                <strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from
                us and our third parties and your communication preferences.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal
              data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>
                Where it is necessary for our legitimate interests (or those of a third party) and your interests and
                fundamental rights do not override those interests.
              </li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
            <p className="mt-4">
              Generally, we do not rely on consent as a legal basis for processing your personal data although we will
              get your consent before sending third party direct marketing communications to you via email or text
              message. You have the right to withdraw consent to marketing at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p className="mb-4">
              We have put in place appropriate security measures to prevent your personal data from being accidentally
              lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your
              personal data to those employees, agents, contractors and other third parties who have a business need to
              know. They will only process your personal data on our instructions and they are subject to a duty of
              confidentiality.
            </p>
            <p>
              We have put in place procedures to deal with any suspected personal data breach and will notify you and
              any applicable regulator of a breach where we are legally required to do so.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Your Legal Rights</h2>
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data.
              These include the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
            <p className="mt-4">If you wish to exercise any of the rights set out above, please contact us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p>
                <strong>Email:</strong> privacy@laundrilab.com
              </p>
              <p>
                <strong>Phone:</strong> +234 800 000 0000
              </p>
              <p>
                <strong>Address:</strong> 123 Laundry Street, Lagos, Nigeria
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
