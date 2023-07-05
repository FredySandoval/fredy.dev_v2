import { z, defineCollection } from 'astro:content';

const blogContent = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
    pinned:  z.number().optional(),
    heroImage: z.string().optional(),
    tags:  z.array(z.string()).optional(),
  }),
});

export const collections = {
  'blog' : blogContent,
}