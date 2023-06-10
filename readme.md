# Important notes

- You have to create this secret using `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf`
- Make sure to add `NPM_TOKEN` to your `skaffold.env` file

  - This `NPM_TOKEN` is the token you get from github when you create a personal access token

    ```shell
    NPM_TOKEN="ghp_..."
    ```
