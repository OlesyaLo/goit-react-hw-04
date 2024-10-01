import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

import css from "./SearchBar.module.css";
export default function SearchBar({onSubmit}) {
    const [query, setQuery] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const form = evt.target;

        if (query.trim() === "") {
            toast.error("Please enter a search term!");
            return;
          }
      
          onSubmit(query);
          form.reset();
    
    }

    const handleChange = (evt) => {
        setQuery(evt.target.value);
      };

      return (
        <header className={css.header}>
            <form onSubmit={handleSubmit} className= {css.searchForm}>
                <input
                name="query"
                type="text"
                autocomplete="off"
                autofocus
                placeholder="Search images and photos"
                value={query}
                onChange={handleChange}
                className={css.input}
                />
                <button type="submit" className={css.searchBtn}>
                    Search
                </button>
            </form>
            <Toaster
                position="top-center"
                reverseOrder={false}
                className= {css}
            />
        </header>
      )
    };

    // const handleSubmit = (values) => {
    //     if (!values.searchQuery.trim()) {
    //       return toast.error("Write anything😉");
    //     }
    //     onSubmit(values.searchQuery);
    //   };
    //   return (
    //     <header className={css.header}>
    //       <Formik initialValues={{ searchQuery: "" }} onSubmit={handleSubmit}>
    //         <Form className={css.searchForm}>
    //           <Field
    //             className={css.input}
    //             type="text"
    //             name="searchQuery"
    //             placeholder="Search images and photos"
    //           ></Field>
    //           <button className={css.searchBtn} type="submit">
    //             Search
    //           </button>
    //         </Form>
    //       </Formik>
    //     </header>
    //   );
    
