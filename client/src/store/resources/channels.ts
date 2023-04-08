import { trpc } from "@ponder/client/lib/trpc";
import { ResourceReturn, createResource, useContext } from "solid-js";

import { App } from "../app";
import { AuthContext } from "@ponder/client/core/auth/AuthProvider";

interface Channel {
  threads: Array<{
    id: string;
    channelId: string;
    title: string;
    latestPost: {
      id: string;
      createdAt: Date;
      contentPlain: string;
      authorId: string;
      author: {
        id: string;
        displayName: string;
        avatarUrl: string | null;
      };
    };
  }>;
  description: string | null;
  id: string;
  isPublic: boolean;
  name: string;
}

export interface ChannelsStore {
  channel: (channelId: string) => ResourceReturn<Channel>;
  listAll: () => ResourceReturn<Array<{ id: string; name: string }>>;
}

export const init = (app: App) => {
  const channels = new Map<string, ResourceReturn<Channel>>();
  const getChannel = (channelId: string) => {
    const channel = createResource<Channel>(() => {
      return trpc.channels.getById.query({ channelId }) as unknown as Channel;
    });
    channels.set(channelId, channel);
    return channel;
  };

  let allChannelsList: ResourceReturn<
    Array<{ id: string; name: string }>
  > | null = null;

  const getAllChannelsList = () => {
    const auth = useContext(AuthContext);

    const allChannels = createResource(() => {
      const organisationId =
        auth?.currentUser()?.organisations[0]?.organisationId;

      if (!organisationId) {
        return [];
      }

      return trpc.channels.listAll.query({
        organisationId,
      });
    });

    allChannelsList = allChannels;
    return allChannels;
  };

  const store: ChannelsStore = {
    channel: (channelId: string) => {
      if (channels.has(channelId)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return channels.get(channelId)!;
      }
      return getChannel(channelId);
    },

    listAll: () => {
      if (allChannelsList) {
        return allChannelsList;
      }
      return getAllChannelsList();
    },
  };

  app.setStore("channels", store);
};
