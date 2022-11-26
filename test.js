let num = 2;
let num1 = 2;

// comment line

class Test {
  /**
   * Creates a new topic, by splitting the text anywhere the delimiters are matched by the regular expression.
   * Therefore, the text is saved in blocks of text, each one as a subdocument.
   * @param {*} req must contain a title, text and owner (username)
   * @param {*} res if not error, returns 201 and contains the topic newly created in data field.
   */
  static async create(req, res) {
    const topic = Topic();
    topic.title = req.body.title;
    const text = req.body.text;
    const regex =
      /(?<=[\.+\,])\s|(?<=[\.+\-])\s|(?<=[\.+\\])|(?<=[\.+\/])|(?<=[\.+\;])\s|(?<=[\.+\:])\s|(?<=[\.+\?])\s|(?<=[\.+\.])\s|(?<=[\.+\|])\s|(?<=[\.+\\n])\s|\s(?=[\.+\(])|(?<=[\.+\)])\s|\s(?=[\.+\{}])|(?<=[\.+\}])\s|\s(?=[\.+\[])|(?<=[\.+\]])\s|\s(?=[\.+\‘])|(?<=[\.+\’])\s|\s(?=[\.+\“])|(?<=[\.+\”])\s/g; // eslint-disable-line

    const blocks = text.split(regex);
    blocks.forEach((piece) => {
      topic.blocks.push({ content: piece });
    });
    next();

    topic.save((err) => {
      if (err) return err;
    });

    res.status(201).json({
      status: "success",
      data: topic,
    });
  }

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
  }

  static async updateBlock(req, res) {
    const topic = new Topic();
    const block = topic.blocks.id(req.params.blockId);
    block.category = req.body.category;
    block.save();

    res.status(200).json({
      status: "success",
    });
  }
}
