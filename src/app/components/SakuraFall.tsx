export function SakuraFall() {
  return (
    <div className="sakura-fall" aria-hidden="true">
      {Array.from({ length: 14 }, (_, index) => <span key={index} className="sakura-petal" />)}
    </div>
  )
}
