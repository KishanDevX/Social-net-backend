const db = require("../config/db");

const createPost = async (req, res) => {
  try {
    const { content } = req.body || {};

    if (!content) {
      return res.status(400).json({
        msg: "content is required!",
      });
    }

    const [result] = await db.query(
      "INSERT INTO posts (user_id, content) VALUES (?, ?);",
      [req.user.id, content],
    );

    res.status(201).json({
        msg: "post created successfully.",
        postId: result.postId
    })
  } catch (err) {
    console.error("=X> FAILED POSTING CONTENT! \n", err);
    res.status(500).json({
      msg: "failed posting content!",
    });
  }
};

module.exports = {
  createPost,
};
