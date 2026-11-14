import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { TestimonialSection } from "../../models/Portfolio";

export default async function testimonialsRoutes(fastify: FastifyInstance) {
  // Get all active testimonials (public)
  fastify.get("/api/portfolio/testimonials", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const testimonials = await TestimonialSection.find({ isActive: true }).sort({ order: 1 });
      return { success: true, data: testimonials };
    } catch (error) {
      return reply.internalServerError("Failed to fetch testimonials");
    }
  });

  // Get all testimonials (admin)
  fastify.get(
    "/api/admin/portfolio/testimonials",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const testimonials = await TestimonialSection.find().sort({ order: 1 });
        return { success: true, data: testimonials };
      } catch (error) {
        return reply.internalServerError("Failed to fetch testimonials");
      }
    }
  );

  // Get single testimonial (admin)
  fastify.get(
    "/api/admin/portfolio/testimonials/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const testimonial = await TestimonialSection.findById(id);
        if (!testimonial) {
          return reply.notFound("Testimonial not found");
        }
        return { success: true, data: testimonial };
      } catch (error) {
        return reply.internalServerError("Failed to fetch testimonial");
      }
    }
  );

  // Create testimonial (admin)
  fastify.post(
    "/api/admin/portfolio/testimonials",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = request.body as any;
        const testimonial = new TestimonialSection(body);
        await testimonial.save();
        return reply.code(201).send({ success: true, data: testimonial });
      } catch (error) {
        return reply.badRequest("Failed to create testimonial");
      }
    }
  );

  // Update testimonial (admin)
  fastify.put(
    "/api/admin/portfolio/testimonials/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const body = request.body as any;
        const testimonial = await TestimonialSection.findByIdAndUpdate(id, body, { new: true });
        if (!testimonial) {
          return reply.notFound("Testimonial not found");
        }
        return { success: true, data: testimonial };
      } catch (error) {
        return reply.badRequest("Failed to update testimonial");
      }
    }
  );

  // Delete testimonial (admin)
  fastify.delete(
    "/api/admin/portfolio/testimonials/:id",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const testimonial = await TestimonialSection.findByIdAndDelete(id);
        if (!testimonial) {
          return reply.notFound("Testimonial not found");
        }
        return { success: true, message: "Testimonial deleted successfully" };
      } catch (error) {
        return reply.badRequest("Failed to delete testimonial");
      }
    }
  );

  // Toggle active status (admin)
  fastify.patch(
    "/api/admin/portfolio/testimonials/:id/toggle",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const testimonial = await TestimonialSection.findById(id);
        if (!testimonial) {
          return reply.notFound("Testimonial not found");
        }
        testimonial.isActive = !testimonial.isActive;
        await testimonial.save();
        return { success: true, data: testimonial };
      } catch (error) {
        return reply.badRequest("Failed to toggle testimonial");
      }
    }
  );

  // Reorder testimonials (admin)
  fastify.post(
    "/api/admin/portfolio/testimonials/reorder",
    {
      preHandler: fastify.authenticate,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { testimonialIds } = request.body as { testimonialIds: string[] };
        const updatePromises = testimonialIds.map((id, index) =>
          TestimonialSection.findByIdAndUpdate(id, { order: index })
        );
        await Promise.all(updatePromises);
        return { success: true, message: "Testimonials reordered successfully" };
      } catch (error) {
        return reply.badRequest("Failed to reorder testimonials");
      }
    }
  );
}
