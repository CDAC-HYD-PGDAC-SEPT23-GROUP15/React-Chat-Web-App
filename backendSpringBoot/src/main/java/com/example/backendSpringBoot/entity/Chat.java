package com.example.backendSpringBoot.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Document
public class Chat {

    @Id
    private String id;
    private boolean isGroupChat;
    private List<User> users;
    private String chatName;
    private String latestMessage;
    private String groupAdmin;
    private Date timestamp; // New field for timestamp

    // Default constructor
    public Chat() {
        // Default constructor
    }

    // Parameterized constructor
    public Chat(String id, boolean isGroupChat, List<User> users, String chatName, String latestMessage, String groupAdmin, Date timestamp) {
        this.id = id;
        this.isGroupChat = isGroupChat;
        this.users = users;
        this.chatName = chatName;
        this.latestMessage = latestMessage;
        this.groupAdmin = groupAdmin;
        this.timestamp = timestamp;
    }

    // Getter and Setter for id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Getter and Setter for isGroupChat
    public boolean isGroupChat() {
        return isGroupChat;
    }

    public void setGroupChat(boolean groupChat) {
        isGroupChat = groupChat;
    }

    // Getter and Setter for users
    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    // Getter and Setter for chatName
    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    // Getter and Setter for latestMessage
    public String getLatestMessage() {
        return latestMessage;
    }

    public void setLatestMessage(String latestMessage) {
        this.latestMessage = latestMessage;
    }

    // Getter and Setter for groupAdmin
    public String getGroupAdmin() {
        return groupAdmin;
    }

    public void setGroupAdmin(String groupAdmin) {
        this.groupAdmin = groupAdmin;
    }

    // Getter and Setter for timestamp
    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
