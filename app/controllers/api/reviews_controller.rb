class Api::ReviewsController < ApplicationController
  wrap_parameters include: Review.attribute_names + ["reviewerFN", "reviewerLN"]

  before_action :require_logged_in, only: [:create, :update, :destroy]

  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id
    @review.reviewer_fn = current_user.first_name
    @review.reviewer_ln = current_user.last_name
    if @review.save
      @review.business.add_review
      redirect_to api_restaurant_url(@review.business_id)
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def update
    @review = Review.find_by(id: params[:id])
    @review.user_id = current_user.id
    @review.reviewer_fn = current_user.first_name
    @review.reviewer_ln = current_user.last_name

    if @review && @review.update(review_params)
      @review.business.update_rating
      render json: @review
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def index
    @reviews = Review.all.order(created_at: :desc)
    if @reviews
      render 'api/reviews/index'
    end
  end

  def destroy
    @review = Review.find(params[:id])
    if @review && @review.user_id == current_user.id
      @review.destroy
      @review.business.delete_review
    end
  end
  
  private

  def review_params
    params.require(:review).permit(:rating, :body, :reviewer_fn, :reviewer_ln, :user_id, :business_id)
  end
end