import Doto from "../models/Doto.js";

const normalizeDotoItem = (item) => {
  if (!item || typeof item !== "object") return item;

  const normalized = { ...item };
  if (normalized.status !== undefined && normalized.states === undefined) {
    normalized.states = normalized.status;
  }
  if (normalized.states !== undefined && normalized.status === undefined) {
    normalized.status = normalized.states;
  }
  if (normalized.status !== undefined && normalized.states !== undefined) {
    normalized.status = normalized.status;
    normalized.states = normalized.states;
  }

  normalized.comment = normalized.comment ?? "";
  normalized.reviewStatus = normalized.reviewStatus ?? "pending";
  normalized.reviewer = normalized.reviewer ?? "";
  normalized.review = normalized.comment || "";
  normalized.reviewComment = normalized.comment || "";
  normalized.statusValue = normalized.status ?? normalized.states ?? "pending";
  normalized.state = normalized.states ?? normalized.status ?? "pending";
  normalized.currentStatus =
    normalized.status ?? normalized.states ?? "pending";

  return normalized;
};

const sendDotoListResponse = (res, items) => {
  const list = Array.isArray(items)
    ? items.map(normalizeDotoItem)
    : [normalizeDotoItem(items)];
  return res.status(200).json({
    success: true,
    messages: list,
    count: list.length,
    data: list,
  });
};

export const createDoto = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (!payload.assignee) {
      delete payload.assignee;
    }

    if (!payload.assigner) {
      delete payload.assigner;
    }

    if (!payload.dueDate) {
      delete payload.dueDate;
    }

    if (payload.status && !payload.states) {
      payload.states = payload.status;
    }

    const doto = await Doto.create(payload);

    res.status(201).json({
      success: true,
      data: doto,
    });
  } catch (error) {
    console.error("CREATE DOTO ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDoto = async (req, res) => {
  try {
    const dotos = await Doto.find();
    return sendDotoListResponse(res, dotos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  console.log(req, res);
};

export const getDotoById = async (req, res) => {
  try {
    const { id } = req.params;
    const doto = await Doto.findById(id);
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }
    res.status(200).json(normalizeDotoItem(doto));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDoto = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    if (payload.status !== undefined && payload.states === undefined) {
      payload.states = payload.status;
    }
    if (payload.states !== undefined && payload.status === undefined) {
      payload.status = payload.states;
    }
    if (payload.status !== undefined && payload.states !== undefined) {
      payload.status = payload.status;
      payload.states = payload.states;
    }
    if (payload.review !== undefined && payload.comment === undefined) {
      payload.comment = payload.review;
    }
    if (payload.review !== undefined && payload.reviewStatus === undefined) {
      payload.reviewStatus = "approved";
      console.log(res);
    }

    const doto = await Doto.findById(id);
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }

    Object.assign(doto, payload);
    if (doto.status !== undefined && doto.states === undefined) {
      doto.states = doto.status;
    }
    if (doto.states !== undefined && doto.status === undefined) {
      doto.status = doto.states;
    }
    if (doto.status !== undefined && doto.states !== undefined) {
      doto.status = doto.status;
      doto.states = doto.states;
    }

    await doto.save();

    const updatedTask = normalizeDotoItem(doto);
    res.status(200).json({
      success: true,
      message: "Doto updated successfully",
      data: updatedTask,
      task: updatedTask,
      item: updatedTask,
      messages: [updatedTask],
      tasks: [updatedTask],
      result: [updatedTask],
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDoto = async (req, res) => {
  try {
    const { id } = req.params;
    const doto = await Doto.findByIdAndDelete(id);
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }
    res.status(200).json({ message: "Doto deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDotoByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const doto = await Doto.find({ userId });
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }
    return sendDotoListResponse(res, doto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDotoByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const doto = await Doto.find({ category });
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }
    return sendDotoListResponse(res, doto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDotoByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const doto = await Doto.find({ $or: [{ status }, { states: status }] });
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }
    return sendDotoListResponse(res, doto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDotoByUserIdAndCategory = async (req, res) => {
  try {
    const { userId, category } = req.params;
    const doto = await Doto.find({ userId, category });
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }
    return sendDotoListResponse(res, doto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDotoByUserIdAndStatus = async (req, res) => {
  try {
    const { userId, status } = req.params;
    const doto = await Doto.find({
      userId,
      $or: [{ status }, { states: status }],
    });
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }
    return sendDotoListResponse(res, doto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDotoByCategoryAndStatus = async (req, res) => {
  try {
    const { category, status } = req.params;
    const doto = await Doto.find({
      category,
      $or: [{ status }, { states: status }],
    });
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }
    return sendDotoListResponse(res, doto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDotoByUserIdAndCategoryAndStatus = async (req, res) => {
  try {
    const { userId, category, status } = req.params;
    const doto = await Doto.find({
      userId,
      category,
      $or: [{ status }, { states: status }],
    });
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }
    return sendDotoListResponse(res, doto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDotoBySearch = async (req, res) => {
  try {
    const { search } = req.params;
    const doto = await Doto.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    });
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }
    return sendDotoListResponse(res, doto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDotoByUserIdAndSearch = async (req, res) => {
  try {
    const { userId, search } = req.params;
    const doto = await Doto.find({
      userId,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    });
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }
    return sendDotoListResponse(res, doto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDotoReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, reviewer, reviewStatus } = req.body;

    const doto = await Doto.findById(id);
    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }

    if (comment !== undefined) doto.comment = comment;
    if (reviewer !== undefined) doto.reviewer = reviewer;
    if (reviewStatus !== undefined) doto.reviewStatus = reviewStatus;

    await doto.save();

    const updatedTask = normalizeDotoItem(doto);
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: updatedTask,
      task: updatedTask,
      item: updatedTask,
      messages: [updatedTask],
      comment: updatedTask.comment,
      review: updatedTask.review,

      reviewStatus: updatedTask.reviewStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDotoReview = async (req, res) => {
  try {
    const { id } = req.params;
    const doto = await Doto.findById(id).select(
      "comment reviewer reviewStatus",
    );

    if (!doto) {
      return res.status(404).json({ message: "Doto not found" });
    }

    res.status(200).json({
      comment: doto.comment || "",
      reviewer: doto.reviewer || null,
      reviewStatus: doto.reviewStatus || null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
