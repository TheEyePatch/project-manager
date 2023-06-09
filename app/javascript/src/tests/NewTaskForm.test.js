import { render } from "@testing-library/react"
import { NewTaskForm } from "../components";

describe(NewTaskForm, () => {
  test('successfully creates new task', () => {
    const { getByRole } = render(<NewTaskForm modalOpen={true} />)
  })
})