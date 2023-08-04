class AddUrl < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :web_url, :string, null: false
  end
end
