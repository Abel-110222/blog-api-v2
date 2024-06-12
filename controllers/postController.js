import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  const { title, content, image_url } = req.body;

  try {
    const newPost = await Post.create({
      title,
      content,
      image_url,
      user_id: req.userId // Assuming you have user id stored in req.userId
    });

    res.status(201).json(newPost); // 201 status code indicates successful creation
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { title, content, image_url } = req.body;
  const { postId } = req.params;

  try {
    const post = await Post.findOne({ where: { id: postId, user_id: req.userId } });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.image_url = image_url || post.image_url;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findOne({ where: { id: postId, user_id: req.userId } });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.destroy();
    res.status(204).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findOne({ where: { id: postId }, include: ['User', 'Comments'] });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: ['User', 'Comments'] });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
