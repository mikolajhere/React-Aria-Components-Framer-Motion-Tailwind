import { Drawer } from "vaul";

export function MyComponent() {
  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger className="flex h-12 w-full items-center justify-center rounded-lg bg-slate-900 px-6 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:w-auto">
        Open drawer
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          aria-describedby="unstyled drawer"
          className="fixed bottom-0 right-0 mt-24 flex h-full w-[400px] flex-col rounded-t-[10px] bg-white"
        >
          <Drawer.Description />
          <div className="h-full flex-1 bg-white p-4">
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 font-medium">
                Unstyled drawer for React.
              </Drawer.Title>
              <p className="mb-2 text-zinc-600">
                This component can be used as a replacement for a Dialog on
                mobile and tablet devices.
              </p>
              <p className="mb-8 text-zinc-600">
                It uses{" "}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/dialog"
                  className="underline"
                  target="_blank"
                >
                  Radix&rsquo;s Dialog primitive
                </a>{" "}
                under the hood and is inspired by{" "}
                <a
                  href="https://twitter.com/devongovett/status/1674470185783402496"
                  className="underline"
                  target="_blank"
                >
                  this tweet.
                </a>
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
