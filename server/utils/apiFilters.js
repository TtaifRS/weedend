class APIFilters {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }


  filter() {
    const queryCopy = { ...this.queryStr }




    const removeFields = ['sort', 'limit', 'page']

    removeFields.forEach(el => delete queryCopy[el])


    let queryStr = JSON.stringify(queryCopy)

    this.query = this.query.find(JSON.parse(queryStr))



    return this
  }


  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }

    return this
  }

  pagination() {
    const page = parseInt(this.queryStr.page, 10) || 1
    const limit = parseInt(this.queryStr.limit, 10) || null
    const skipResults = (page - 1) * limit

    this.query = this.query.skip(skipResults).limit(limit)

    return this
  }
}

export default APIFilters