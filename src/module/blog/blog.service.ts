import QueryBuilder from "../../builder/querybuilder";
import { IBlog } from "./blog.interface";
import Blog from "./blog.model";

const createBlog = async (payload: IBlog) => {
  const result = await Blog.create(payload).then((doc) =>
    doc.populate('author')
  );
  return result;
};
const updateBlog = async (id: string, data: IBlog) => {
  const result = await Blog.findByIdAndUpdate(id, data, {
    new: true,
  }).populate('author')
  return result
}

const deleteBlog = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id)
  return result
}
const getAllBlog = async (query: Record<string, unknown>) => {


  const searchableFields = ["title", "content"];
  const blogs = new QueryBuilder(Blog.find(), query).search(searchableFields).filter().sort();

  const result = await blogs.modelQuery;
  // const result = await Blog.find();

  console.log(result);
  return result;
}


export const blogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog
}