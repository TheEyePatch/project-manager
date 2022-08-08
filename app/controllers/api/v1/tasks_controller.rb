class Api::V1::TasksController < ApiController
  def index
    @tasks = Task.all
    render json: @tasks
  end

  def show
    @task = Task.find(params[:id])
  end
end
