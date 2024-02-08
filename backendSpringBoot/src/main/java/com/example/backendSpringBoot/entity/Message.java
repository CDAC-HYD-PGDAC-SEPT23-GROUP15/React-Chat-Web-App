package com.example.backendSpringBoot.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Message {

    @Id
    private String id;
    private String senderId; // Id of the sender
    private String senderName; // Name of the sender
    private String content; // Content of the message
    @DBRef
    private Chat chat; // Reference to the chat it belongs to

    // Default constructor
    public Message() {
        // Default constructor
    }

    // Parameterized constructor
    public Message(String senderId, String senderName, String content, Chat chat) {
        this.senderId = senderId;
        this.senderName = senderName;
        this.content = content;
        this.chat = chat;
    }

    // Getter and Setter for id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Getter and Setter for senderId
    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    // Getter and Setter for senderName
    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    // Getter and Setter for content
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // Getter and Setter for chat
    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }
}
