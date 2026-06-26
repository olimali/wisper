import ChatItem from "@/components/ChatItem";
import EmptyUI from "@/components/EmptyUI";
import Header from "@/components/Header";
import { useChats } from "@/hooks/useChats";
import { Chat } from "@/types";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";

const ChatsTab = () => {
  const router = useRouter();
  const { data: chats, isLoading, error, refetch, isRefetching } = useChats();

  if (isLoading) {
    return (
      <View className="flex-1 bg-surface justify-center items-center">
        <ActivityIndicator size={"large"} color={"#f4A261"} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-surface items-center justify-center">
        <Text className="text-red-500 text-3xl">Failed to load chats</Text>
        <Pressable
          onPress={() => refetch()}
          className="mt-4 px-4 py-2 bg-primary rounded-lg"
        >
          {isRefetching ? (
            <ActivityIndicator color={"#fff"} />
          ) : (
            <Text className="text-foreground">Retry</Text>
          )}
        </Pressable>
      </View>
    );
  }

  const handleChatPress = (chat: Chat) => {
    router.push({
      pathname: "/chat/[id]",
      params: {
        id: chat._id,
        participantId: chat.participant._id,
        name: chat.participant.name,
        avatar: chat.participant.avatar,
      },
    });
  };

  return (
    <View className="flex-1 bg-surface">
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ChatItem chat={item} onPress={() => handleChatPress(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <EmptyUI
            title="No chats yet"
            subtitle="Start a conversation!"
            iconName="chatbubbles-outline"
            iconColor="#6B6B70"
            iconSize={64}
            buttonLabel="New Chat"
            onPressButton={() => router.push("/new-chat")}
          />
        }
      />
    </View>
  );
};

export default ChatsTab;
