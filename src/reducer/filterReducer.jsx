const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":
            let priceArr = action.payload.map((currElem) => currElem.price);
            // let maxPrice=Math.max.apply(null, priceArr);
            // let maxPrice = priceArr.reduce((initialValue, currValue)=> Math.max(initialValue, currValue),0);
            let maxPrice = Math.max(...priceArr);

            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: { ...state.filters, maxPrice, price: maxPrice },
            }

        case "SET_GRID_VIEW":
            return {
                ...state,
                grid_view: true,
            }

        case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view: false,
            }

        case "GET_SORT_VALUE":
            // let userSortValue = document.getElementById("sort");
            // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;

            return {
                ...state,
                // sorting_value: sort_value,
                sorting_value: action.payload,
            }

        case "SORTING_PRODUCTS":
            let newSortData;
            // let tempSortProduct = [...action.payload];

            const { filter_products, sorting_value } = state;
            let tempSortProduct = [...filter_products];

            // if(state.sorting_value==="lowest"){
            //     newSortData=tempSortProduct.sort((a,b)=>{
            //         return a.price-b.price;
            //     })
            // }
            // if(state.sorting_value==="highest"){
            //     newSortData=tempSortProduct.sort((a,b)=>{
            //         return b.price-a.price;
            //     })
            // }
            // if(state.sorting_value==="a-z"){
            //     newSortData=tempSortProduct.sort((a,b)=>{
            //         return a.name.localeCompare(b.name);
            //     })
            // }
            // if(state.sorting_value==="z-a"){
            //     newSortData=tempSortProduct.sort((a,b)=>{
            //         return b.name.localeCompare(a.name);
            //     })
            // }

            const sortingProducts = (a, b) => {
                if (sorting_value === "lowest") {
                    return a.price - b.price;
                }
                if (sorting_value === "highest") {
                    return b.price - a.price;
                }
                if (sorting_value === "a-z") {
                    return a.name.localeCompare(b.name);
                }
                if (sorting_value === "z-a") {
                    return b.name.localeCompare(a.name);
                }
            }

            newSortData = tempSortProduct.sort(sortingProducts);

            return {
                ...state,
                filter_products: newSortData,
            }

        case "UPDATE_FILTER_VALUE":
            const { name, value } = action.payload;
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                },
            }

        case "FILTER_PRODUCTS":
            let { all_products } = state;
            let tempFilterProduct = [...all_products];

            const { text, category, company, color, price } = state.filters;
            if (text) {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    // return currElem.name.toLowerCase().startsWith(text);
                    return currElem.name.toLowerCase().includes(text);
                })
            }
            if (category !== "All") {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.category === category;
                })
            }
            if (company !== "All") {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.company.toLowerCase() === company.toLowerCase();
                })
            }
            if (color !== "All") {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.colors.includes(color);
                })
            }
            if (color !== "All") {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.colors.includes(color);
                })
            }
            if (price) {
                tempFilterProduct = tempFilterProduct.filter((currElem) => {
                    return currElem.price <= price;
                })
            }

            return {
                ...state,
                filter_products: tempFilterProduct,
            }

        case "CLEAR_FILTERS":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: "",
                    category: "All",
                    company: "All",
                    color: "All",
                    maxPrice: 0,
                    price: state.filters.maxPrice,
                    minPrice: state.filters.maxPrice,
                },
            }

        default:
            return state;
    }
}
export default filterReducer;