"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "/src/components/navbar/_components/ui/navigation-menu";

import {
  PiBookOpenTextLight,
  PiFileThin,
  PiSparkleLight,
  PiTargetLight,
} from "react-icons/pi";

const components = [
  {
    title: "Download for Desktop",
    href: "/download/desktop",
    description: "Get the desktop version of the app for Windows and Mac.",
  },
  {
    title: "Download for Mobile",
    href: "/download/mobile",
    description: "Download the mobile version for iOS and Android.",
  },
];

export function Menu() {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-2xl px-4 py-2">
              Product
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex ">
                <ul className="grid p-2 md:w-[400px] lg:w-[250px] hover:cursor-pointer border-r">
                  <div className="flex items-center gap-1 hover-bg-gray-400/10 p-1 rounded-sm">
                    <PiBookOpenTextLight className="text-2xl mr-2 text-red-600" />
                    <div>
                      <a>Quiz Builder</a>
                      <p className="text-gray-400 text-sm font-light">
                        Create and test your knowledge with custom quizzes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 hover-bg-gray-400/10 p-1 rounded-sm">
                    <PiSparkleLight className="text-2xl mr-2 text-purple-600" />
                    <div>
                      <a>AI-Powered Notes</a>
                      <p className="text-gray-400 text-sm font-light">
                        Use AI to assist in creating detailed and organized
                        notes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 hover-bg-gray-400/10 p-1 rounded-sm">
                    <PiFileThin className="text-2xl mr-2 text-yellow-600" />
                    <div>
                      <a>Document Hub</a>
                      <p className="text-gray-400 text-sm font-light">
                        Store and organize all your study materials in one
                        place.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 hover-bg-gray-400/10 p-1 rounded-sm">
                    <PiTargetLight className="text-2xl mr-2 text-blue-600" />
                    <div>
                      <a>Collaborative Projects</a>
                      <p className="text-gray-400 text-sm font-light">
                        Collaborate and manage study projects with your peers.
                      </p>
                    </div>
                  </div>
                </ul>
                <div>
                  <ul className="grid p-2 md:w-[400px] lg:w-[250px] hover:cursor-pointer border-r">
                    <div className="flex items-center gap- hover-bg-gray-400/10 p-1 rounded-sm">
                      <div>
                        <a>Note Templates</a>
                        <p className="text-gray-400 text-sm font-light">
                          Pre-designed setups to help you start note-taking
                          fast.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap- hover-bg-gray-400/10 p-1 rounded-sm">
                      <div>
                        <a>Browse Community Notes</a>
                        <p className="text-gray-400 text-sm font-light">
                          Explore notes and quizzes shared by other students.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap- hover-bg-gray-400/10 p-1 rounded-sm">
                      <div>
                        <a>Success Stories</a>
                        <p className="text-gray-400 text-sm font-light">
                          See how LearnWithFranny is transforming student
                          learning.
                        </p>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-2xl px-4 py-2">
              Download
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-2xl px-4 py-2">
              Support
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid p-2 md:w-[400px] lg:w-[250px] hover:cursor-pointer border-r">
                <div className="flex items-center gap-1 hover-bg-gray-400/10 p-1 rounded-sm">
                  <div>
                    <a>FAQ</a>
                    <p className="text-gray-400 text-sm font-light">
                      Find answers to frequently asked questions.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 hover-bg-gray-400/10 p-1 rounded-sm">
                  <div>
                    <a>Contact Support</a>
                    <p className="text-gray-400 text-sm font-light">
                      Reach out to us for direct assistance.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 hover-bg-gray-400/10 p-1 rounded-sm">
                  <div>
                    <a>Community</a>
                    <p className="text-gray-400 text-sm font-light">
                      Join the conversation and ask questions.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 hover-bg-gray-400/10 p-1 rounded-sm">
                  <div>
                    <a>Help Center</a>
                    <p className="text-gray-400 text-sm font-light">
                      Access detailed guides and troubleshooting tips.
                    </p>
                  </div>
                </div>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    {
      return (
        <li>
          <NavigationMenuLink asChild>
            <a
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
              )}
              {...props}
            >
              <div className="text-md font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </a>
          </NavigationMenuLink>
        </li>
      );
    }
  }
);
ListItem.displayName = "ListItem";

export default Menu;
