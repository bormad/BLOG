export const postTransform = (dbPost) => ({
	id: dbPost.id,
	title: dbPost.title,
	publishedAt: dbPost.published_at,
	imageUrl: dbPost.image_url,
	content: dbPost.content
});
