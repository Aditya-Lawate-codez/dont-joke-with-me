import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Form, routeAction$, routeLoader$ } from '@builder.io/qwik-city';
import styles from "./index.css?inline"
export const useDadJoke = routeLoader$(async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
  });
  return (await response.json()) as {
    id: string;
    status: number;
    joke: string;
  };
});

export const useJokeVoteAction = routeAction$((props) => {

  console.log('VOTE', props.vote);
});


export default component$(() => {
  useStylesScoped$(styles);
  const dadJokeSignal = useDadJoke();
  const favoriteJokeAction = useJokeVoteAction();
  var isFavourite = useSignal(false);
  return (
    <section class="section bright">
      <p>{dadJokeSignal.value.joke}</p>
      <Form action={favoriteJokeAction}>
        <input type="hidden" onInput$={() => {
          isFavourite.value = true
        }} name="jokeID" value={dadJokeSignal.value.id} />
        <button name="vote" value="up">👍</button>
        <button name="vote" value="down">👎</button>
      </Form>
      <button
        onClick$={() => {
          isFavourite.value = !isFavourite.value;
          console.log(isFavourite)
        }}
      >
        {isFavourite.value ? "❤️" : "🤍"}

      </button>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Don't Joke with me",
  meta: [
    {
      name: "Don't Joke with me",
      content: "This is a dad's joke website",
    },
  ],
};