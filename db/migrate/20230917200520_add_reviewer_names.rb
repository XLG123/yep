class AddReviewerNames < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :reviewer_fn, :string, null: false
    add_column :reviews, :reviewer_ln, :string, null: false
  end
end
