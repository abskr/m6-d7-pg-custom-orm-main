const db = require("./index");

class Model {
  constructor(name) {
    if (!name) {
      throw new Error("Model name is required");
    }
    this.name = name;
  }

  async find(filter) {
    // {id:1,something:"new"}
    const entries = Object.entries(filter || {});
    let query = `SELECT * FROM public.${this.name} ${
      entries.length > 0 ? "WHERE" : ""
    } `;
    query += entries
      .map(([key, value], i) => {
        console.log({ length: entries.length, i });
        return `${key}='${value}'${i !== entries.length - 1 ? " AND " : ""}`;
      })
      .join("");
    query += ";";
    console.log(query);
    const { rows } = await db.query(query);
    return rows;
  }

  async findById(filter) {
    // {id:1,something:"new"}
    if (!filter || (!filter.id.name && !filter.id.value)) {
      throw new Error("Id is required");
    }
    let query = `SELECT * FROM public.${this.name} WHERE ${filter.id.name}=${filter.id.value} `;
    const { rows } = await db.query(query);
    return rows[0];
  }

  async create(data) {
    if (!data || Object.entries(data).length === 0) {
      throw new Error("Data is required to create ", this.name);
    }
    let keys = Object.keys(data);
    let values = Object.values(data);
    let query = `INSERT INTO public.${this.name} (${keys.join(
      ","
    )}) VALUES(${values.map((value) => `'${value}'`).join(",")})`;
    query += ";";
    const { command, rowCount } = await db.query(query);
    return { command, rowCount };
  }

  async findByIdAndUpdate(id, update) {
    if (
      !update ||
      !id ||
      (!id.name && !id.value) ||
      Object.entries(update).length === 0
    ) {
      throw new Error("Id and update are required");
    }
    let query = `UPDATE public.${this.name} SET ${Object.entries(update)
      .map(([key, value]) => `${key}='${value}'`)
      .join(",")} WHERE ${id.name}=${id.value}`;
    query += ";";
    const { command, rowCount } = await db.query(query);
    return { command, rowCount };
  }
  
  async findByIdAndDelete(id) {
    if (!id || (!id.name && !id.value)) {
      throw new Error("Id is required");
    }
    let query = `DELETE FROM public.${this.name} WHERE ${id.name}=${id.value}`;
    query += ";";
    const { command, rowCount } = await db.query(query);
    return { command, rowCount };
  }
}

module.exports = Model;
