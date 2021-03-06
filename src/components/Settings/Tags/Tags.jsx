import React from "react";
import s from "./Tags.module.css";
import { observer } from "mobx-react-lite";
import user from "../../../store/currentUser";

const Tags = observer(() => {
  return (
    <div className={s.body}>
      <div className={`${s.cost_name} h3`}>Стоимость съемки в час:</div>
      <div className={s.input_container}>
        <input
          className={s.input_cost}
          placeholder="10000"
          type="number"
          value={user.userSettings.min_cost}
          onChange={(e) =>
            user.setUserSettings("min_cost", e.target.value)
          }
        />
        <div className={`${s.prefix_input} h3`}>₽</div>
      </div>
      <div className={`${s.tags_name} h3`}>
        Выберите жанры в которых вы снимаете:
      </div>
      <div className={s.tags}>
        {user.tags.map((tag) => (
          <div
            className={`${s.tag} ${
              (user.user_tags.find((user_tag) => user_tag.id === tag.id) &&
                !user.remove_tags.find(
                  (remove_tag) => remove_tag.id === tag.id
                )) ||
              user.add_tags.find((add_tag) => add_tag.id === tag.id)
                ? s.select
                : ""
            }`}
            key={tag.id}
            onClick={() => {
              user.selectTag(tag);
            }}
          >
            {tag.name}
          </div>
        ))}
      </div>
      <button
        className={`${s.save} h3`}
        onClick={() => {
          user.updateTags();
        }}
        disabled={user.loading_tags}
      >
        Сохранить
      </button>
    </div>
  );
});

export default Tags;
