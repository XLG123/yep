json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :first_name, :last_name, :email, :zip_code, :created_at
    end
  end
end