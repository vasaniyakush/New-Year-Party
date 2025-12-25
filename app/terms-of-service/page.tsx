export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                1. Acceptance of Terms
              </h2>
              <p className="mt-2">
                By accessing and using this New Year Party website, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to these terms, please 
                do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                2. Use License
              </h2>
              <p className="mt-2">
                Permission is granted to temporarily access the materials on this website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer 
                of title, and under this license you may not:
              </p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                3. User Accounts
              </h2>
              <p className="mt-2">
                To access certain features of this website, you must create an account using Google Sign-In. 
                You are responsible for maintaining the confidentiality of your account and password. You 
                agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                4. User Conduct
              </h2>
              <p className="mt-2">
                You agree not to:
              </p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Use the service for any unlawful purpose</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Attempt to gain unauthorized access to any portion of the service</li>
                <li>Submit false or misleading information in your RSVP</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                5. RSVP Information
              </h2>
              <p className="mt-2">
                By submitting an RSVP, you agree to provide accurate information about your attendance 
                and number of guests. You understand that this information will be used for event planning 
                purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                6. Privacy
              </h2>
              <p className="mt-2">
                Your use of this website is also governed by our Privacy Policy. Please review our Privacy 
                Policy to understand our practices regarding the collection and use of your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                7. Disclaimer
              </h2>
              <p className="mt-2">
                The materials on this website are provided on an 'as is' basis. We make no warranties, 
                expressed or implied, and hereby disclaim and negate all other warranties including, 
                without limitation, implied warranties or conditions of merchantability, fitness for a 
                particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                8. Limitations
              </h2>
              <p className="mt-2">
                In no event shall we or our suppliers be liable for any damages (including, without 
                limitation, damages for loss of data or profit, or due to business interruption) arising 
                out of the use or inability to use the materials on this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                9. Revisions
              </h2>
              <p className="mt-2">
                We may revise these terms of service at any time without notice. By using this website, 
                you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                10. Contact Information
              </h2>
              <p className="mt-2">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <ul className="mt-2 space-y-1">
                <li>📧 Email: [Add your contact email]</li>
                <li>📱 Phone: [Add your contact phone]</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

