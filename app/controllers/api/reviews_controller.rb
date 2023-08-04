class Api::ReviewsController < ApplicationController
  wrap_parameters include: Review.attribute_names

  before action :require_logged_in, only: [:create, :update, :destroy]

  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id
    if @review.save
      render :create
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def index
    @reviews = Review.all
    if @reviews
      render 'api/reviews/index'
    end
  end

  private

  def review_params
    params.require(:review).permit(:rating, :body, :user_id, :business_id)
  end
end