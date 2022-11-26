static async updateBlock(req, res) {
    const topic = new Topic();
    const block = topic.blocks.id(req.params.blockId);
    block.category = req.body.category;
    await block.save();

    res.status(200).json({
      status: "success",
    });
  }
}
