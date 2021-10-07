package sv.iuh.weeallo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.iuh.weeallo.models.Message;
import sv.iuh.weeallo.repository.MessageRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    private MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> findAllMessagesByRoom(Long roomId) {
        return messageRepository.getAllByRoom(roomId);
    }

    public Message sendMessage(Message message) {
        return messageRepository.save(message);
    }

    public void remove(Message message){
        messageRepository.delete(message);
    }

    public Optional <Message> findById(Long id){
        return  messageRepository.findById(id);
    }

    public List<Message> findMessagesByUser(Long id){
        return messageRepository.findMessagesByUser(id);
    }
}
