import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { ContactInfo, ContactMessage } from "../../models/Portfolio";

export default async function contactRoutes(fastify: FastifyInstance) {
  // ============= CONTACT INFO =============
  
  // Get active contact info (public)
  fastify.get("/api/portfolio/contact-info", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const contactInfo = await ContactInfo.findOne({ isActive: true }).sort({ updatedAt: -1 });
      if (!contactInfo) {
        return reply.notFound("Contact info not found");
      }
      return { success: true, data: contactInfo };
    } catch (error) {
      return reply.internalServerError("Failed to fetch contact info");
    }
  });

  // Get all contact info (admin)
  fastify.get(
    "/api/admin/portfolio/contact-info",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const contactInfos = await ContactInfo.find().sort({ updatedAt: -1 });
        return { success: true, data: contactInfos };
      } catch (error) {
        return reply.internalServerError("Failed to fetch contact info");
      }
    }
  );

  // Create contact info (admin)
  fastify.post(
    "/api/admin/portfolio/contact-info",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = request.body as any;
        const contactInfo = new ContactInfo(body);
        await contactInfo.save();
        return reply.code(201).send({ success: true, data: contactInfo });
      } catch (error) {
        return reply.badRequest("Failed to create contact info");
      }
    }
  );

  // Update contact info (admin)
  fastify.put(
    "/api/admin/portfolio/contact-info/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const body = request.body as any;
        const contactInfo = await ContactInfo.findByIdAndUpdate(id, body, { new: true });
        if (!contactInfo) {
          return reply.notFound("Contact info not found");
        }
        return { success: true, data: contactInfo };
      } catch (error) {
        return reply.badRequest("Failed to update contact info");
      }
    }
  );

  // Delete contact info (admin)
  fastify.delete(
    "/api/admin/portfolio/contact-info/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const contactInfo = await ContactInfo.findByIdAndDelete(id);
        if (!contactInfo) {
          return reply.notFound("Contact info not found");
        }
        return { success: true, message: "Contact info deleted successfully" };
      } catch (error) {
        return reply.badRequest("Failed to delete contact info");
      }
    }
  );

  // ============= CONTACT MESSAGES =============
  
  // Submit contact form (public)
  fastify.post("/api/portfolio/contact", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body as any;
      const message = new ContactMessage(body);
      await message.save();
      
      // TODO: Send email notification to admin
      
      return reply.code(201).send({ 
        success: true, 
        message: "Your message has been sent successfully. We'll get back to you soon!" 
      });
    } catch (error) {
      return reply.badRequest("Failed to send message");
    }
  });

  // Get all contact messages (admin)
  fastify.get(
    "/api/admin/portfolio/contact-messages",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { isRead, isReplied } = request.query as { isRead?: string; isReplied?: string };
        const filter: any = {};
        
        if (isRead !== undefined) filter.isRead = isRead === "true";
        if (isReplied !== undefined) filter.isReplied = isReplied === "true";
        
        const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
        const unreadCount = await ContactMessage.countDocuments({ isRead: false });
        
        return { success: true, data: messages, unreadCount };
      } catch (error) {
        return reply.internalServerError("Failed to fetch messages");
      }
    }
  );

  // Get single contact message (admin)
  fastify.get(
    "/api/admin/portfolio/contact-messages/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const message = await ContactMessage.findById(id);
        if (!message) {
          return reply.notFound("Message not found");
        }
        
        // Mark as read
        if (!message.isRead) {
          message.isRead = true;
          await message.save();
        }
        
        return { success: true, data: message };
      } catch (error) {
        return reply.internalServerError("Failed to fetch message");
      }
    }
  );

  // Mark message as read (admin)
  fastify.patch(
    "/api/admin/portfolio/contact-messages/:id/read",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const message = await ContactMessage.findByIdAndUpdate(
          id,
          { isRead: true },
          { new: true }
        );
        if (!message) {
          return reply.notFound("Message not found");
        }
        return { success: true, data: message };
      } catch (error) {
        return reply.badRequest("Failed to mark message as read");
      }
    }
  );

  // Mark message as replied (admin)
  fastify.patch(
    "/api/admin/portfolio/contact-messages/:id/replied",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const message = await ContactMessage.findByIdAndUpdate(
          id,
          { isReplied: true },
          { new: true }
        );
        if (!message) {
          return reply.notFound("Message not found");
        }
        return { success: true, data: message };
      } catch (error) {
        return reply.badRequest("Failed to mark message as replied");
      }
    }
  );

  // Delete contact message (admin)
  fastify.delete(
    "/api/admin/portfolio/contact-messages/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const message = await ContactMessage.findByIdAndDelete(id);
        if (!message) {
          return reply.notFound("Message not found");
        }
        return { success: true, message: "Contact message deleted successfully" };
      } catch (error) {
        return reply.badRequest("Failed to delete message");
      }
    }
  );

  // Bulk mark as read (admin)
  fastify.post(
    "/api/admin/portfolio/contact-messages/bulk-read",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { messageIds } = request.body as { messageIds: string[] };
        await ContactMessage.updateMany(
          { _id: { $in: messageIds } },
          { isRead: true }
        );
        return { success: true, message: "Messages marked as read" };
      } catch (error) {
        return reply.badRequest("Failed to mark messages as read");
      }
    }
  );

  // Bulk delete messages (admin)
  fastify.post(
    "/api/admin/portfolio/contact-messages/bulk-delete",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { messageIds } = request.body as { messageIds: string[] };
        await ContactMessage.deleteMany({ _id: { $in: messageIds } });
        return { success: true, message: "Messages deleted successfully" };
      } catch (error) {
        return reply.badRequest("Failed to delete messages");
      }
    }
  );
}
