# react-inf-scroller
This library allows you create infinite scroll using ref callback way <br>
Under the hood it works using IntersectionObserver

> You can copy and paste this component to your project!

## Usage
```ts
import { InfiniteScrollRef, InfiniteScroll } from 'react-inf-scroller'

export function App() {
  const [mockData, setMockData] = useState(new Array(12).fill(0))

  // You can use useInfiniteQuery hook from @tanstack/react-query
  // But for now we use mockData
  const fetchMore = () => {
    setMockData(prev => [...prev, new Array(12).fill(0)])
  }

  const handleEndReached = (entries: IntersectionObserverEntry[], _node: HTMLDivElement | null) => {
    const entry = entries[0] // select first and once entry from array
    if (entry.isInteresting) { // check if this entry is visible
      fetchMore() // fetchMore
    }
  }

  return (
    <InfiniteScroll endReached={handleEndReached} deps={[]}>
      {ref => items.map((item, idx, self) => (
        <div ref={idx === self.length - 1 ? ref : null}>{item}</div>
      ))}
    </InfiniteScroll>
  )
}
```

## Recomendations for you
Usually infinite scroll uses for really large lists (100 000+ items) and for better optimization developers should you virtualized list <br>
Pleas combine this library with something like [react-window](https://www.npmjs.com/package/react-window), [react-virtualized](https://www.npmjs.com/package/react-virtualized), [react-virtuoso](https://www.npmjs.com/package/react-virtuoso)

I personaly prefer [react-virtuoso](https://www.npmjs.com/package/react-virtuoso), because this library is really simple, you can use it too <3
