# react-aston-project

- Recipe-Finder – приложение для поиска рецептов блюд.
- Использованное API: [TheMealDB](https://www.themealdb.com/api.php).

---

## Основной функционал

- Регистрация и авторизация пользователей;
- Поиск рецептов по категории/названию/ингридиенту;
- Страница с персональной историей поиска и избранным;
- Авторизованный пользователь может использовать/редактировать личную историю поиска и избранные рецепты;

## Реализация требований

### 1 уровень (обязательный - необходимый минимум)

- [x] Реализованы Требования к функциональности.

#### React

- [x] Пишем функциональные компоненты c хуками: [components](src/components).
- [x] Есть разделение на [умные](src/components/SingleRecipe/SingleRecipe.js) и [глупые](src/components/Loader/Loader.js) компоненты.
- [x] Есть рендеринг [списков](src/components/RecipeList/RecipeList.js).
- [x] Реализована хотя бы одна [форма](src/components/Forms/SignInForm.js).
- [x] Есть применение Контекст API: [AuthContext](src/context/AuthContext.js).
- [x] Есть применение предохранителя: [ErrorBoundary](src/route/routes.js).
- [x] Есть хотя бы один кастомный хук: [useDebounce](src/hooks/useDebounce.js) и [useAuth](src/hooks/useAuth.js).
- [x] Хотя бы несколько компонентов используют PropTypes: [CategoryList](src/components/Category/CategoryList.js), [FavoritesItem](src/components/FavoritesItem/FavoritesItem.js).
- [x] Поиск не должен триггерить много запросов к серверу ([debounce](src/components/Search/Search.js)).
- [x] Есть применение [lazy + Suspense](src/route/routes.js).

#### Redux

- [x] Используем Modern Redux with Redux Toolkit: [store](src/store/index.js).
- [x] Используем слайсы: [userSliсe](src/store/slices/userSlice.js).
- [x] Есть хотя бы одна кастомная мидлвара: [userMiddleware](src/store/middleware/customMiddleware.js).
- [x] Используется RTK Query: [recipes](src/store/recipesApi.js).
- [x] Используется Transforming Responses: [user](src/store/recipesApi.js).

### 2 уровень (необязательный)
- [x] Использование Firebase для учетных записей пользователей, их Избранного и Истории поиска [firebase](src/firebase/firebase.js).