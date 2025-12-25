export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                1. Information We Collect
              </h2>
              <p className="mt-2">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Name and email address (via Google Sign-In)</li>
                <li>RSVP information including attendance status, number of guests, dietary restrictions, and notes</li>
                <li>User role information (admin or basic user)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                2. How We Use Your Information
              </h2>
              <p className="mt-2">
                We use the information we collect to:
              </p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Manage event RSVPs and guest lists</li>
                <li>Communicate with you about the event</li>
                <li>Provide access to event information and features</li>
                <li>Ensure proper access control and security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                3. Data Storage and Security
              </h2>
              <p className="mt-2">
                Your data is stored securely using Firebase (Google Cloud Platform). We implement appropriate 
                security measures to protect your personal information. However, no method of transmission over 
                the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                4. Third-Party Services
              </h2>
              <p className="mt-2">
                We use Firebase Authentication (Google) for user authentication. By signing in with Google, 
                you agree to Google's Privacy Policy. We do not share your personal information with other 
                third parties except as necessary to provide our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                5. Your Rights
              </h2>
              <p className="mt-2">
                You have the right to:
              </p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Access your personal data</li>
                <li>Update or correct your information</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, please contact us using the contact information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                6. Data Retention
              </h2>
              <p className="mt-2">
                We retain your personal information for as long as necessary to provide our services and 
                fulfill the purposes outlined in this policy, unless a longer retention period is required 
                by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                7. Changes to This Policy
              </h2>
              <p className="mt-2">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                8. Contact Us
              </h2>
              <p className="mt-2">
                If you have any questions about this Privacy Policy, please contact us at:
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

