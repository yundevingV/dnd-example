"use client";

import React, { useState } from "react";
import { DragAndDrop, Drag, Drop } from "../app/components/index";
import { reorder } from "./helpers"; // 적절한 경로로 수정

const NestedListComponent = () => {
  const [categories, setCategories] = useState([
    {
      id: "q101",
      name: "Category 1",
      items: [
        { id: "abc", name: "First" },
        { id: "def", name: "Second" },
      ],
    },
    {
      id: "wkqx",
      name: "Category 2",
      items: [
        { id: "ghi", name: "Third" },
        { id: "jkl", name: "Fourth" },
        { id: "jfl", name: "Kink" },
      ],
    },
  ]);

  // 드래그앤드랍이 마치고 실행되는 함수
  const handleDragEnd = (result) => {
    const { type, source, destination } = result;
    // 목적지가 없으면 리턴
    if (!destination) return;

    // 아이디 추출
    const sourceCategoryId = source.droppableId;
    const destinationCategoryId = destination.droppableId;

    if (type === "droppable-item") {
      if (sourceCategoryId === destinationCategoryId) {
        const updatedOrder = reorder(
          categories.find((category) => category.id === sourceCategoryId).items,
          source.index,
          destination.index
        );
        const updatedCategories = categories.map((category) =>
          category.id !== sourceCategoryId
            ? category
            : { ...category, items: updatedOrder }
        );

        setCategories(updatedCategories);
      } else {
        const sourceOrder = categories.find(
          (category) => category.id === sourceCategoryId
        ).items;
        const destinationOrder = categories.find(
          (category) => category.id === destinationCategoryId
        ).items;

        const [removed] = sourceOrder.splice(source.index, 1);
        destinationOrder.splice(destination.index, 0, removed);

        const updatedCategories = categories.map((category) =>
          category.id === sourceCategoryId
            ? { ...category, items: sourceOrder }
            : category.id === destinationCategoryId
            ? { ...category, items: destinationOrder }
            : category
        );

        setCategories(updatedCategories);
      }
    }

    // Reordering categories
    if (type === "droppable-category") {
      const updatedCategories = reorder(
        categories,
        source.index,
        destination.index
      );

      setCategories(updatedCategories);
    }
  };

  return (
    <DragAndDrop onDragEnd={handleDragEnd}>
      <Drop id="droppable" type="droppable-category">
        {categories.map((category, categoryIndex) => (
          <Drag
            className="draggable-category"
            key={category.id}
            id={category.id}
            index={categoryIndex}
          >
            <div className="category-container">
              <h2 className="item">{category.name}</h2>

              <Drop key={category.id} id={category.id} type="droppable-item">
                {category.items.map((item, index) => (
                  <Drag
                    className="draggable"
                    key={item.id}
                    id={item.id}
                    index={index}
                  >
                    <div className="item">{item.name}</div>
                  </Drag>
                ))}
              </Drop>
            </div>
          </Drag>
        ))}
      </Drop>
    </DragAndDrop>
  );
};

export default NestedListComponent;
