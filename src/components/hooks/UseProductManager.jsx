import React, { useState, useRef, useMemo, useCallback, useContext, useEffect } from "react";
import { instance } from "../axios/index";
import useDebounce from "../../components/hooks/useDebounce";
import ThemeToggle from "./ThemeToggle";
import { socket } from "../socket";

export default function useProductManager(products, setProducts) {
    const role = localStorage.getItem("role");


    const [search, setSearch] = useState("");

    const [expandedId, setExpandedId] =
        useState(null);
    const deletedProductRef = useRef(null);
    // waits 500ms after typing stops
    const debouncedSearch =
        useDebounce(search, 500);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);


    const [editDescription, setEditDescription] =
        useState("");

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedId(null);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await instance.get("/products");
                console.log("fetched product", response)
                setProducts(response.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {

        socket.on("productAdded", (newProduct) => {

            console.log("Socket Product Added:", newProduct);

            setProducts((prev) => {

                // Avoid duplicates
                if (prev.some(p => p._id === newProduct._id)) {
                    return prev;
                }

                return [newProduct, ...prev];

            });

            toast.success("New product added!");

        });

        return () => {

            socket.off("productAdded");

        };

    }, [setProducts]);
    useEffect(() => {

        socket.on("productUpdated", (updatedProduct) => {

            setProducts(prev =>

                prev.map(product =>

                    product._id === updatedProduct._id

                        ? updatedProduct

                        : product

                )

            );

        });

        return () => {

            socket.off("productUpdated");

        };

    }, [setProducts]);

    useEffect(() => {

        socket.on("productDeleted", (id) => {

            setProducts(prev =>

                prev.filter(product => product._id !== id)

            );

        });

        return () => {

            socket.off("productDeleted");

        };

    }, [setProducts]);


    const handleConfirmDelete = (event) => {
        if (event?.currentTarget) event.currentTarget.blur();
        deleteProduct(selectedId);
        handleCloseDialog();
    };
    const handleCancelDelete = () => {
        setOpenDialog(false);
        setSelectedId(null);
    };
    const deleteProduct = useCallback(
        async (id) => {
            const productToDelete = products.find(
                (product) => product._id === id
            );

            if (!productToDelete) return;

            // Remove immediately from UI
            const updatedProducts = products.filter(
                (product) => product._id !== id
            );

            setProducts(updatedProducts);

            let undoClicked = false;

            toast.warning(
                ({ closeToast }) => (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <span>Product Deleted</span>

                        <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            onClick={() => {
                                undoClicked = true;

                                setProducts((prev) => [
                                    productToDelete,
                                    ...prev,
                                ]);

                                closeToast();
                            }}
                        >
                            Undo
                        </Button>
                    </div>
                ),
                {
                    autoClose: 2000,

                    onClose: async () => {
                        if (!undoClicked) {
                            try {
                                await instance.delete(`/products/${id}`);

                                toast.success("Product deleted permanently");
                            } catch (error) {
                                console.log(error);

                                // Restore UI if backend delete failed
                                setProducts((prev) => [
                                    productToDelete,
                                    ...prev,
                                ]);

                                toast.error("Delete Failed");
                            }
                        }
                    },
                }
            );
        },
        [products, setProducts]
    );

    const startEditing = (product) => {
        setEditingId(product._id);
        setEditTitle(product.title);
        setEditDescription(product.description);
    };

    const updateProduct = useCallback(
        async (id) => {
            try {
                const response = await instance.put(
                    `/products/${id}`,
                    {
                        title: editTitle,
                        description: editDescription,
                    }
                );

                setProducts((prev) =>
                    prev.map((product) =>
                        product._id === id ? response.data : product
                    )
                );
                setEditingId(null);
                toast.success("Product Updated");
            } catch (error) {
                console.log(error);
                toast.error("Update Failed");
            }
        },
        [editTitle, editDescription, setProducts]
    );

    const filteredProducts =
        useMemo(() => {

            console.log(
                "Filtering Products"
            );

            return products.filter(
                (product) =>
                    product.title
                        ?.toLowerCase()
                        .includes(
                            debouncedSearch.toLowerCase()
                        )
            );

        }, [products, debouncedSearch]);
    return {

        role,

        search,
        setSearch,

        expandedId,
        setExpandedId,

        editingId,

        editTitle,
        setEditTitle,

        editDescription,
        setEditDescription,

        filteredProducts,

        openDialog,

        handleDeleteClick,
        handleCancelDelete,
        handleConfirmDelete,

        startEditing,

        updateProduct

    };

}