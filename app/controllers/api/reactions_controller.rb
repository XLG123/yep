class Api::ReactionsController < ApplicationController
  wrap_parameters include: Reaction.attribute_names

  before_action :require_logged_in, only: [:create, :destroy]

  def create
    @reaction = Reaction.new(reaction_params)
    if @reaction.save
      if @reaction.reaction_type == "helpful"
        @reaction.review.increment_helpful_count
      elsif @reaction.reaction_type == "thanks"
        @reaction.review.increment_thanks_count
      elsif @reaction.reaction_type == "love_this"
        @reaction.review.increment_love_this_count
      else
        @reaction.review.increment_oh_no_count
      end
      render json: @reaction
    else
      render json: @reaction.errors.full_messages, status: 422
    end
  end

  def destroy
    @reaction = Reaction.find(params[:id])
    if @reaction && @reaction.user_id == current_user.id
      @reaction.destroy
      if @reaction.reaction_type == "helpful"
        @reaction.review.decrement_helpful_count
      elsif @reaction.reaction_type == "thanks"
        @reaction.review.decrement_thanks_count
      elsif @reaction.reaction_type == "love_this"
        @reaction.review.decrement_love_this_count
      else
        @reaction.review.decrement_oh_no_count
      end
    end
  end

  def index
    @reactions = Reaction.all
    if @reactions
      render 'api/reactions/index'
    end
  end
  
  
  private

  def reaction_params
    params.require(:reaction).permit(:reaction_type, :review_id, :user_id)
  end
end