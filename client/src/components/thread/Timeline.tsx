import { Component } from "solid-js";
import { Post } from "./Post.jsx";

interface TimelineProps {}

export const Timeline: Component<TimelineProps> = (props) => {
  return (
    <div class="w-full max-w-xl">
      <ul role="list">
        <Post
          author={{
            avatarUrl: "https://avatars.githubusercontent.com/u/206640?v=4",
            displayName: "hamza",
          }}
        />
        <Post
          author={{
            avatarUrl: "https://avatars.githubusercontent.com/u/206640?v=4",
            displayName: "hamza",
          }}
        />{" "}
        <Post
          author={{
            avatarUrl: "https://avatars.githubusercontent.com/u/206640?v=4",
            displayName: "hamza",
          }}
        />{" "}
        <Post
          author={{
            avatarUrl: "https://avatars.githubusercontent.com/u/206640?v=4",
            displayName: "hamza",
          }}
        />{" "}
        <Post
          author={{
            avatarUrl: "https://avatars.githubusercontent.com/u/206640?v=4",
            displayName: "hamza",
          }}
        />{" "}
        <Post
          author={{
            avatarUrl: "https://avatars.githubusercontent.com/u/206640?v=4",
            displayName: "hamza",
          }}
        />
      </ul>
    </div>
  );
};

/*
<div class="flex-1 flex justify-center p-8 overflow-y-auto">
    <div class="max-w-xl w-full">
      <ul role="list">

          <li>
            <div class="relative pb-8">

                <span class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>

              <div class="relative flex items-start space-x-3">
                <div class="relative">
                  <img class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white" src="https://avatars.githubusercontent.com/u/206640?v=4" alt="hamza@gitstart.com's avatar">

                  <span class="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                    <!-- Heroicon name: solid/chat-alt -->
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                </div>
                <div class="min-w-0 flex-1">
                  <div>
                    <div class="text-sm">
                      <a href="#" class="font-medium text-gray-900">hamza@gitstart.com</a>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Commented 3 months ago
                    </p>
                  </div>
                  <div class="mt-2 text-sm text-gray-700">
                    <div id="post-34" phx-update="ignore" phx-hook="RichTextEditor" editor-content="{&quot;content&quot;:[{&quot;content&quot;:[{&quot;text&quot;:&quot;Hello Folks&quot;,&quot;type&quot;:&quot;text&quot;}],&quot;type&quot;:&quot;paragraph&quot;},{&quot;content&quot;:[{&quot;text&quot;:&quot;I would love to fix daily lunch times in Warsaw. How about 1pm every day?&quot;,&quot;type&quot;:&quot;text&quot;}],&quot;type&quot;:&quot;paragraph&quot;},{&quot;content&quot;:[{&quot;text&quot;:&quot;Looking forward!&quot;,&quot;type&quot;:&quot;text&quot;}],&quot;type&quot;:&quot;paragraph&quot;}],&quot;type&quot;:&quot;doc&quot;}" class="" editor-class="prose prose-sm focus:outline-none"><div contenteditable="false" translate="no" class="ProseMirror prose prose-sm focus:outline-none"><p>Hello Folks</p><p>I would love to fix daily lunch times in Warsaw. How about 1pm every day?</p><p>Looking forward!</p></div></div>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div class="relative pb-8">

              <div class="relative flex items-start space-x-3">
                <div class="relative">
                  <img class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white" src="https://avatars.githubusercontent.com/u/355680" alt="siwek's avatar">

                  <span class="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                    <!-- Heroicon name: solid/chat-alt -->
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                </div>
                <div class="min-w-0 flex-1">
                  <div>
                    <div class="text-sm">
                      <a href="#" class="font-medium text-gray-900">siwek</a>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Commented 3 months ago
                    </p>
                  </div>
                  <div class="mt-2 text-sm text-gray-700">
                    <div id="post-35" phx-update="ignore" phx-hook="RichTextEditor" editor-content="{&quot;content&quot;:[{&quot;content&quot;:[{&quot;text&quot;:&quot;The time we (me and Andreea) used to do so far was 12:30 since it worked the best around all team/company meetings.&quot;,&quot;type&quot;:&quot;text&quot;}],&quot;type&quot;:&quot;paragraph&quot;}],&quot;type&quot;:&quot;doc&quot;}" class="" editor-class="prose prose-sm focus:outline-none"><div contenteditable="false" translate="no" class="ProseMirror prose prose-sm focus:outline-none"><p>The time we (me and Andreea) used to do so far was 12:30 since it worked the best around all team/company meetings.</p></div></div>
                  </div>
                </div>
              </div>
            </div>
          </li>

      </ul>
    </div>
  </div>
*/
