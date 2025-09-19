import PageLayout from "../components/layout/page-layout";

export default function ContactPage() {
  return (
    <PageLayout
      title="Contact"
      description="Get in touch with me for collaborations, questions, or just to say hello."
    >
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Connect</h2>
          <div className="flex flex-col gap-3 text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M4.984 3.5C4.984 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.484 1.12 2.484 2.5zM.262 8.25H4.74V23.5H.262V8.25zM8.25 8.25h4.33v2.067h.062c.603-1.144 2.077-2.35 4.275-2.35 4.574 0 5.415 3.01 5.415 6.923V23.5h-4.477v-6.68c0-1.594-.028-3.644-2.222-3.644-2.224 0-2.565 1.737-2.565 3.531V23.5H8.25V8.25z" />
              </svg>
              <a href="https://www.linkedin.com" className="hover:underline">LinkedIn</a>
            </div>
            <div className="flex items-center gap-2">
              <img src="/globe.svg" alt="Website" className="h-5 w-5" />
              <a href="https://sev.dev" className="hover:underline">Website</a>
            </div>
            <div className="flex items-center gap-2">
              <img src="/window.svg" alt="Window" className="h-5 w-5" />
              <a href="https://example.com" className="hover:underline">Other Platform</a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
