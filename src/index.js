import "boxicons";
import "@/styles/globals.css";
import $ from "cash-dom";
import "@/components";
import backdropOpen from "@/store/backdrop-open";
import detailDrawerOpen from "@/store/detail-drawer-open";
import detailMealStore from "@/store/detail-meal-store";
import mealRepository from "@/repositories/meal-repositories";

const backdrop = $("#backdrop");

backdrop.on("click", () => {
  backdropOpen.setState(false);
  detailDrawerOpen.setState(false);
});

$("detail-meal-drawer").on("click", (e) => {
  if (e.target.id === "detail-drawer") {
    backdropOpen.setState(false);
    detailDrawerOpen.setState(false);
  }
});

$(document).ready(() => {
  mealRepository.getAll().then((res) => {
    const listMeal = $("#list-meal");
    const { meals } = res;

    meals.forEach((meal) => {
      const mealCard = $(document.createElement("meal-card"));
      mealCard.attr("image-src", meal.strMealThumb);
      mealCard.attr("name", meal.strMeal);
      mealCard.attr("id", meal.idMeal);
      mealCard.attr("category", meal.strCategory);
      mealCard.attr("area", meal.strArea);
      mealCard.attr("tags", meal.strTags);
      listMeal.append(mealCard);

      mealCard.on("click", () => {
        detailDrawerOpen.setState(true);
        backdropOpen.setState(true);
        detailMealStore.setState(meal);
      });
    });
  });

  mealRepository.getCategories().then((res) => {
    const listCategory = $("#list-category");
    const { categories } = res;

    categories.forEach((category) => {
      const categoryCard = $(document.createElement("category-card"));
      categoryCard.attr("imageSrc", category.strCategoryThumb);
      categoryCard.attr("name", category.strCategory);
      listCategory.append(categoryCard);
    });
  });
});

detailMealStore.subscribe((meal) => {
  const detailDrawer = $("detail-meal-drawer");
  detailDrawer.attr("json", JSON.stringify(meal));
});

$("#close-detail").on("click", () => {
  detailDrawerOpen.setState(false);
  backdropOpen.setState(false);
});

// Toggle drawer
detailDrawerOpen.subscribe((isOpen) => {
  const backdrop = $("#detail-drawer");

  if (isOpen) {
    backdrop.removeClass("animate-out slide-out-to-bottom");
    backdrop.removeClass("hidden");

    backdrop.addClass("flex animate-in slide-in-from-bottom duration-300");
  } else {
    backdrop.removeClass("animate-in slide-in-from-bottom");
    backdrop.addClass("animate-out slide-out-to-bottom");

    setTimeout(() => {
      backdrop.addClass("hidden");
      backdrop.removeClass("flex");
    }, 250);
  }
});

// Toggle backdrop
backdropOpen.subscribe((isOpen) => {
  const backdrop = $("#backdrop");

  if (isOpen) {
    backdrop.removeClass("animate-out fade-out");
    backdrop.removeClass("hidden");

    backdrop.addClass("block animate-in fade-in duration-300");
    document.body.classList.add("overflow-hidden");
  } else {
    backdrop.removeClass("animate-in fade-in");
    backdrop.addClass("animate-out fade-out");

    document.body.classList.remove("overflow-hidden");

    setTimeout(() => {
      backdrop.addClass("hidden");
      backdrop.removeClass("block");
    }, 250);
  }
});
