import { Button } from "@/components/ui/button";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const Follow = () => {
  return (
    <div className="rounded-lg border border-border px-8 py-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Follow</h3>
        <Button variant="ghost" size="icon">
          <Cog6ToothIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-4 space-y-4">
        <div className="space-y-2">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-900"
            prefetch={false}
          >
            <Image
              src="/placeholder.svg"
              width={40}
              height={40}
              alt="User"
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                @johndoe
              </div>
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              Follow
            </Button>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            prefetch={false}
          >
            <Image
              src="/placeholder.svg"
              width={40}
              height={40}
              alt="User"
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium">Jane Smith</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                @janesmith
              </div>
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              Follow
            </Button>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            prefetch={false}
          >
            <Image
              src="/placeholder.svg"
              width={40}
              height={40}
              alt="User"
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium">Bob Johnson</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                @bobjohnson
              </div>
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              Follow
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Follow;
