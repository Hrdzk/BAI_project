<template>
  <TheHeader />
  <div class="container">
    <BaseText>
      Access to
      <template v-slot:purple-text>millions of books</template>
    </BaseText>
    <div class="input-group input-group-lg my-3 align-item-center">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-lg"
          >Search book</span
        >
      </div>
      <input
        type="text"
        class="form-control"
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
        placeholder="Start entering title of book"
        v-model="searchValue"
      />
    </div>
    <div v-if="searchValue">
      <BaseButton @click="clearSearch()">CLEAR SEARCH</BaseButton>
    </div>

    <div class="card-deck">
      <div
        class="card text-center my-3"
        v-for="result in filteredBooks"
        :key="result.id"
      >
        <img
          class="card-img-top"
          :src="result.poster"
          @click="getData(result)"
        />
        <div class="card-body">
          <h5 class="card-title">{{ result.book.title }}</h5>
          <p class="card-text" @click="getAuthorBooks(result)">
            {{ result.author.name + " " + result.author.surname }}
          </p>
        </div>
        <div class="card-footer">
          <small>{{ result.book.genre }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api: "https://my.api.mockaroo.com",
      api_key: "881c9e40",
      results: [],
      results_keys: [],
      clicked_result: [],
      searchValue: "",
    };
  },
  computed: {
    filteredBooks() {
      let tempBooks = this.results;

      if (this.searchValue != "" && this.searchValue) {
        tempBooks = tempBooks.filter((item) => {
          return item.book.title
            .toUpperCase()
            .includes(this.searchValue.toUpperCase());
        });
      }
      return tempBooks;
    },
  },
  methods: {
    getApi() {
      fetch(`${this.api}/books_project.json?key=${this.api_key}`)
        .then((res) => res.json())
        .then((result) => {
          this.results = JSON.parse(JSON.stringify(result));
          this.results_keys = Object.keys(this.results["0"]);
        })
        .then(console.log(this.results));
    },
    getData(item) {
      // łapie dane konkretnego plakatu i przekazuje na podstronę.
      this.clicked_result = item;
      this.bookPage(this.clicked_result);
    },
    getAuthorBooks(item) {
      this.clicked_result = item;
      this.authorPage(this.clicked_result);
    },
    bookPage(book_data) {
      // metoda przekierowująca na unikalną podstronę książki
      console.log(book_data.book.title);
      this.$router.push({
        name: "Book", //book component
        params: {
          title: book_data.book.title,
          author_name: book_data.author.name,
          author_surname: book_data.author.surname,
          book_genre: book_data.book.genre,
          book_pages: book_data.book.pages,
          release_year: book_data.book.release_year,
          book_poster: book_data.poster,
          isbn: book_data.isbn,
          book_rate: book_data.rate.average,
          book_votes: book_data.rate.votes,
          description: book_data.description,
        },
      });
    },
    authorPage(author_data) {
      // metoda przekierowująca na unikalną podstronę książki
      console.log(author_data.author.name);
      this.$router.push({
        name: "Author", //book component
        params: {
          author_name: author_data.author.name,
          author_surname: author_data.author.surname,
        },
      });
    },
    clearSearch() {
      this.searchValue = "";
    },
  },
  mounted() {
    this.getApi();
  },
};
</script>

<style scoped>
.card-deck {
  margin-top: 10px;
  margin-left: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 0.5rem;
}

.card-img-top {
  width: 100%;
  height: 20vw;
  object-fit: cover;
}

.card {
  background: #564f6f;
  border: 1px solid #d1d7e0;
  cursor: pointer;
}

.card-footer {
  background: #4c495d;
}
</style>