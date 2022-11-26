/**
   * Gets a topic given an id.
   * @param {*} req must contains the field id, of the topic in params.
   * @param {*} res if not error, returns 200 and contains the corresponding topic in data field.
   */
 static async getById(req, res) {
    const topic = await Topic.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        topic,
      },
    });
